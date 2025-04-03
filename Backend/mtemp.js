import dotenv from "dotenv"
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import express from "express";
import fs from "fs-extra";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { clearInterval, setInterval } from "timers";
import { getFilesInDirectory } from "./utilities/file_utils.js";
import { getSongDuration } from "./utilities/ffmpeg_utils.js";
import * as mm from "music-metadata";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config({path: "../.env"})

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "50mb" }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();
let bucket;
mongoose.connection.once("open", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "audioFiles",
    chunkSizeBytes: 1024 * 255,
  });
  console.log("GridFS bucket initialized");
});

// Multer Configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/aac",
      "audio/ogg",
      "audio/webm",
    ];
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(
          new Error("Invalid file type. Only audio files are allowed."),
          false
        );
  },
});

const getAudioDuration = (buffer) => {
  return new Promise((resolve, reject) => {
    // Create a temporary file to process
    const tempFilePath = path.join("./cache", "temp_audio");
    fs.writeFileSync(tempFilePath, buffer);

    ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
      // Clean up the temp file
      fs.unlink(tempFilePath, () => {});

      if (err) {
        console.error("Error getting duration:", err);
        return reject(err);
      }

      resolve(metadata.format.duration || 0);
    });
  });
};

// Upload Endpoint with duration calculation
app.post("/api/upload", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!bucket) throw new Error("GridFS bucket not initialized");

    const authHeader = req.headers["authorization"];

    // Extract the token (format: "Bearer <token>")
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    if(token != process.env.TOKEN){
        return res.status(403).json({ error: "Unauthorized" });
      }

    const filename = req.file.originalname;
    const baseName = path.parse(filename).name;

    // Calculate duration
    let duration = 0;
    try {
      duration = await getAudioDuration(req.file.buffer);
      console.log(`Calculated duration: ${duration} seconds`);
    } catch (err) {
      console.error("Could not calculate duration, using default 0:", err);
    }

    const songMetaData = {
      title: req.body.title || baseName,
      artist: req.body.artist || "Unknown Artist",
      album: req.body.album || "Unknown Album",
      duration: duration,
      file: filename,
      vote: 0,
      contentType: req.file.mimetype,
      size: req.file.size,
      uploadDate: new Date(),
    };

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: songMetaData,
    });

    uploadStream.end(req.file.buffer);

    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    res.status(201).json({
      success: true,
      fileId: uploadStream.id.toString(),
      filename: filename,
      metadata: songMetaData,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "File upload failed",
      details: error.message,
    });
  }
});

const mp3FoldPath = "./assets/music";
const cacheDir = path.join("cache");
fs.ensureDirSync(cacheDir);

const chunkSize = 8; // 8-second chunks
let songQueue = [];
let currentSong = null;
let currentTime = 0;
let currentChunk = 0;
let songIndex = 0;
let intervalId;
let bits = ["128k", "192k", "256k", "320k"];
let globalPrevIndex = 0;
let clients = []; // Track connected clients for synchronization
let preloading = false;
let globalChunkIndex = 0;
let nextSongIndex = 0;
let prevNumbers = [0];
let queueSize = 5;
let songList = [];

const livePlaybackEnabled = false;
const powerFullCpu = false;

function updateVote(checkval, id) {
  // Find the song by id
  const song = songList[id];
  console.log(song);
  // If the song is found, increment its vote
  if (song) {
    if (!checkval) song.vote++;
    else song.vote--;
  } else {
    console.log("Song not found");
  }
  console.log(song);
  // songList.sort((a, b) => b.vote - a.vote);
}

// Preload chunks for a song
const preloadChunks = async (songPath) => {
  try {
    const totalDuration = await getSongDuration(songPath);
    const totalChunks = Math.ceil(totalDuration / chunkSize);

    console.log(`preloading: ${globalChunkIndex}`);

    for (
      let k = globalChunkIndex, i = 0;
      k < globalChunkIndex + totalChunks;
      i++, k++
    ) {
      for (let j = 0; j < 4; j++) {
        const startTime = i * chunkSize;
        const chunkFilePath = path.join(cacheDir, `chunk_${k}_${bits[j]}.mp3`);

        // Process each chunk sequentially
        await new Promise((resolveChunk, rejectChunk) => {
          ffmpeg(songPath)
            .setStartTime(startTime)
            .duration(chunkSize)
            .audioCodec("libmp3lame")
            .format("mp3")
            .audioBitrate(bits[j])
            .output(chunkFilePath)
            .on("end", resolveChunk)
            .on("error", rejectChunk)
            .run();
        });
      }
    }

    console.log("Chunks have been successfully preloaded");
  } catch (err) {
    console.error("Error preloading chunks:", err);
  }
};

//high cpu consumption
const parallelPreloadChunks = async (songPath) => {
  try {
    const totalDuration = await getSongDuration(songPath);
    const totalChunks = Math.ceil(totalDuration / chunkSize);

    let chunkPromises = [];
    console.log(`preloading: ${globalChunkIndex}`);

    for (
      let k = globalChunkIndex, i = 0;
      k < globalChunkIndex + totalChunks;
      i++, k++
    ) {
      for (let j = 0; j < 4; j++) {
        const startTime = i * chunkSize;
        const chunkFilePath = path.join(cacheDir, `chunk_${k}_${bits[j]}.mp3`);

        // Cache the chunk
        chunkPromises.push(
          new Promise((resolveChunk, rejectChunk) => {
            ffmpeg(songPath)
              .setStartTime(startTime)
              .duration(chunkSize)
              .audioCodec("libmp3lame")
              .format("mp3")
              .audioBitrate(bits[j])
              .output(chunkFilePath)
              .on("end", resolveChunk)
              .on("error", rejectChunk)
              .run();
          })
        );
      }
    }
    await Promise.all(chunkPromises);
    console.log("Chunks have been successfully preloaded");
  } catch (err) {
    console.error("Error preloading chunks:", err);
  }
};

function generateUniqueRandom(prevNumbers, max, queueSize) {
  const numSet = new Set(prevNumbers); // Set for fast lookup

  let randomNum;

  // Generate a random number that is not in the set
  do {
    randomNum = Math.floor(Math.random() * max);
  } while (numSet.has(randomNum));

  // If the queue is full, pop the earliest one
  if (prevNumbers.length >= queueSize) {
    const oldestNum = prevNumbers.shift(); // Remove the oldest number
    numSet.delete(oldestNum); // Remove it from the set
  }

  // Add the new random number to the queue and the set
  prevNumbers.push(randomNum);
  numSet.add(randomNum);

  return randomNum;
}

// Update song queue
const updateSongQueue = async () => {
  songQueue = await getFilesInDirectory(mp3FoldPath);
  console.log("Updated song queue:", songQueue);
};

// Broadcast current time to clients
const broadcastTimeUpdate = () => {
  clients.forEach((client) => {
    if (client.res.writable) {
      client.res.write(`data: ${currentTime}\n\n`);
    }
  });
};

// Start playback of the song queue
const startPlayback = async (index = 0) => {
  await updateSongQueue();
  if (livePlaybackEnabled) {
    if (songQueue.length === 0) {
      console.log("No songs in queue");
      return;
    }

    currentSong = songQueue[index];
    console.log(`Playing: ${currentSong}`);
    if (index === 0) {
      // console.log(generateUniqueRandom([0],songQueue.length,1));
      if (powerFullCpu) await parallelPreloadChunks(currentSong);
      else await preloadChunks(currentSong);
      prevNumbers.push(1);
    }
    currentTime = 0;
    currentChunk = 0;
    preloading = false;

    const duration = await getSongDuration(currentSong);
    const maxChunks = Math.ceil(duration / chunkSize);
    globalChunkIndex += maxChunks;

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentTime += 1;
      if (currentTime % chunkSize === 0) currentChunk++;

      if (currentChunk >= maxChunks) {
        songIndex = nextSongIndex;
        globalPrevIndex += maxChunks;
        clearInterval(intervalId);
        console.log(`Song finished, switching to index ${songIndex}`);
        startPlayback(songIndex);
      } else if (preloading == false && currentChunk > maxChunks * 0.8) {
        // Preload next song if 80% through current song
        preloading = true;
        nextSongIndex = generateUniqueRandom(
          prevNumbers,
          songQueue.length,
          queueSize
        );
        const nextSong = songQueue[nextSongIndex % songQueue.length];
        if (powerFullCpu) parallelPreloadChunks(nextSong);
        else preloadChunks(nextSong);
      }

      broadcastTimeUpdate();
    }, 1000);
  }
};

// Stream endpoint with bitrate and optimized chunk delivery
app.get("/stream/:bitrate", (req, res) => {
  if (livePlaybackEnabled) {
    if (!currentSong) {
      return res.status(404).send("No song is currently playing");
    }

    const bitrate = bits.includes(req.params.bitrate)
      ? req.params.bitrate
      : "320k";
    res.setHeader("Content-Type", "audio/mp3");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");

    // Calculate starting chunk based on current time
    const startChunkIndex =
      globalPrevIndex + Math.floor(currentTime / chunkSize);
    let chunkIndex = startChunkIndex;

    // Client-specific timers
    const timers = [];

    // Function to send a chunk
    const sendChunk = (index) => {
      const chunkFilePath = path.join(
        cacheDir,
        `chunk_${index}_${bitrate}.mp3`
      );
      if (fs.existsSync(chunkFilePath)) {
        const readStream = fs.createReadStream(chunkFilePath);
        readStream.pipe(res, { end: false });
        readStream.on("end", () => {
          console.log(`Sent chunk ${index} at bitrate ${bitrate}`);
        });
        readStream.on("error", (err) => {
          console.error(`Error streaming chunk ${index}:`, err);
        });
      } else {
        console.log(`Chunk ${index} not available, retrying...`);
        setTimeout(() => sendChunk(index), 1000); // Retry after 1s
      }
    };

    // Initial chunk delivery with delays
    const initialDelays = [0]; // 0, 2.67s, 5.33s, 8s
    initialDelays.forEach((delay, i) => {
      if (chunkIndex + i >= startChunkIndex) {
        const timer = setTimeout(() => sendChunk(chunkIndex + i), delay);
        timers.push(timer);
      }
    });

    // Subsequent chunks every 8 seconds
    let nextChunkTime = 8000; // Start after initial 8s
    const interval = setInterval(() => {
      chunkIndex = chunkIndex + 1;
      sendChunk(chunkIndex);
      nextChunkTime += 8000;
    }, 8000);
    timers.push(interval);

    // Clean up on client disconnect
    req.on("close", () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
      console.log("Client disconnected, timers cleared");
    });
  }
});

async function getAudioFilesMetadata(directoryPath) {
  // Read all files in the directory
  const files = fs.readdirSync(directoryPath);

  // Filter for audio files (you can modify this regex to include other formats)
  const audioFiles = files.filter((file) =>
    /\.(mp3|flac|wav|aac|ogg)$/i.test(file)
  );

  const songsMetadata = [];
  let ind = 0;
  // Loop through each audio file and extract metadata
  for (const audioFile of audioFiles) {
    const audioFilePath = path.join(directoryPath, audioFile);

    try {
      // Read metadata
      const metadata = await mm.parseFile(audioFilePath);

      // Extract relevant metadata
      const songMetaData = {
        title:
          metadata.common.title ||
          path.basename(audioFile, path.extname(audioFile)),
        artist: metadata.common.artist || "Unknown Artist",
        album: metadata.common.album || "Unknown Album",
        duration: metadata.format.duration || 0, // in seconds
        file: audioFile,
        vote: 0,
        id: ind++,
      };
      // console.log(songMetaData);
      songsMetadata.push(songMetaData);
    } catch (error) {
      console.error(`Error reading metadata for ${audioFile}:`, error);
    }
  }

  // Return the JSON list of metadata
  return songsMetadata;
}

async function updateList() {
  songList = await getAudioFilesMetadata("./assets/music");
  // console.log(songList);
}

app.get("/LiveSongMeta", (req, res) => {
  // console.log(songList[songIndex]);
  if (livePlaybackEnabled) res.json(songList[songIndex]);
});

app.get("/api/list", async (req, res) => {
  try {
    const files = await mongoose.connection.db
      .collection("audioFiles.files")
      .find()
      .sort({ uploadDate: -1 })
      .toArray();

    res.json(
      files.map((file) => ({
        id: file._id,
        ...file.metadata,
        length: file.length,
        uploadDate: file.uploadDate,
      }))
    );
  } catch (error) {
    console.error("List error:", error);
    res
      .status(500)
      .json({ error: "Error listing files", details: error.message });
  }
});

// Sync endpoint for time updates
app.get("/sync", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Transfer-Encoding", "chunked");

  res.write("data: connected\n\n");
  clients.push({ res });

  req.on("close", () => {
    clients = clients.filter((client) => client.res !== res);
  });
});
app.post("/api/list/top", express.json(), (req, res) => {
  console.log("post ok");
  let toUpdateId = req.body.id;
  let checkval = req.body.check;
  console.log(toUpdateId);
  updateVote(checkval, toUpdateId);
  // console.log(songList);
  res.json(songList);
});

//song streaming with ranged requests
app.post("/get-song", express.json(), (req, res) => {
  const { name, id } = req.body;
  console.log(req.body, id);

  // Validate input
  // if (!id ) {
  //   return res.status(400).json({ error: 'Song ID and name are required' });
  // }

  // Find the song by id and name
  // const song = songList.find(
  //   (song) => song.id === id && song.name.toLowerCase() === name.toLowerCase()
  // );

  if (id < 0 || id > songList.length)
    return res.status(404).json({ error: "Song not found" });

  // If song not found
  // if (!song) {
  //   return res.status(404).json({ error: 'Song not found' });
  // }

  // Get the full file path for the audio file
  const songFilePath = songQueue[id];

  // Check if the file exists
  fs.stat(songFilePath, (err, stat) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(500).json({ error: "Audio file not found" });
    }

    // Set headers to indicate file type and enable range requests
    res.setHeader("Content-Type", "audio/mpeg"); // Set the correct MIME type for MP3 (you may adjust based on file type)
    res.setHeader("Accept-Ranges", "bytes"); // Enable partial content requests (seekable audio)
    res.setHeader("Cache-Control", "public, max-age=5000"); // Cache the song for 1 day (adjust as necessary)
    res.setHeader("Content-Length", stat.size); // Set the content length (helps client manage buffering)

    // Start streaming the audio file
    const readStream = fs.createReadStream(songFilePath);
    readStream.pipe(res); // Stream the audio data to the client
  });
});

//song streaming with ranged requests
app.get("/get-song/:id", async (req, res) => {
  console.log("getsong called");
  try {
    if (!bucket) throw new Error("GridFS bucket not initialized");

    const fileId = new ObjectId(req.params.id);
    const file = await mongoose.connection.db
      .collection("audioFiles.files")
      .findOne({ _id: fileId });

    if (!file) return res.status(404).json({ error: "File not found" });

    // Set common headers
    res.set({
      "Content-Type": file.metadata.contentType,
      "Content-Length": file.length,
      "Content-Disposition": `inline; filename="${file.filename}"`,
      "Accept-Ranges": "bytes",
    });

    // Check for range header
    const range = req.headers.range;
    if (range) {
      console.log("Range request received:", range);

      // Parse range (example: "bytes=0-1000")
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;

      // Validate range
      if (start >= file.length || end >= file.length) {
        res.status(416).set({ "Content-Range": `bytes */${file.length}` });
        return res.end();
      }

      // Set partial content headers
      res.status(206).set({
        "Content-Range": `bytes ${start}-${end}/${file.length}`,
        "Content-Length": end - start + 1,
      });

      // Stream the requested range
      const downloadStream = bucket.openDownloadStream(fileId, {
        start,
        end: end + 1, // GridFS expects end to be exclusive
      });
      downloadStream.pipe(res);
    } else {
      // Full file request
      console.log("Full file request");
      const downloadStream = bucket.openDownloadStream(fileId);
      downloadStream.pipe(res);
    }
  } catch (error) {
    console.error("Stream error:", error);
    res
      .status(500)
      .json({ error: "Error streaming audio", details: error.message });
  }
});
app.get("/SongMeta/:id", async (req, res) => {
  console.log("songmeta called");
  try {
    const fileId = new ObjectId(req.params.id);
    const file = await mongoose.connection.db
      .collection("audioFiles.files")
      .findOne({ _id: fileId });

    // console.log("songmeta id: ",fileId)
    // console.log(file)
    if (!file) return res.status(404).json({ error: "File not found" });

    console.log(
      {
        id: file._id,
        ...file.metadata,
        uploadDate: file.uploadDate,
      },
      "hi"
    );
    res.json({
      id: file._id,
      ...file.metadata,
      uploadDate: file.uploadDate,
    });
  } catch (error) {
    console.error("Metadata error:", error);
    res
      .status(500)
      .json({ error: "Error fetching metadata", details: error.message });
  }
});

app.post("/download", express.json(), (req, res) => {
  const { name, id } = req.body;

  // Validate the request body
  //   if (!id ) {
  //     return res.status(400).json({ error: 'Song ID and name are required' });
  //   }

  // Find the song

  if (id < 0 || id > songList.length)
    return res.status(404).json({ error: "Song not found" });

  const songFilePath = songQueue[id];

  // Set headers to indicate the content type is an audio file
  res.setHeader("Content-Type", "audio/mpeg");
  //   res.setHeader('Content-Disposition', `attachment; filename="${song.name}.mp3"`); // Optional: force download
  res.setHeader("Content-Length", fs.statSync(songFilePath).size);

  // Send the entire song file as a response
  fs.createReadStream(songFilePath).pipe(res);
});

const port = 3001;
// Middleware Configuration
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  updateList();
  await startPlayback(songIndex);
});
