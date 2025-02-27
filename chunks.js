import express from 'express'
import fs from 'fs-extra'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'


const app = express();

const mp3FilePath = path.join("assets/music/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3","");  
// Directory to cache 8-second chunks
const cacheDir = path.join('cache');
fs.ensureDirSync(cacheDir);

// Define the chunk size (8 seconds in seconds)
const chunkSize = 8;

// to implement
let songQueue = [mp3FilePath];  // Future song queue
let currentSong = null;  // This will track the current song being played
let currentTime = 0;  // Current playback time in seconds

// A map to store preloaded chunks in memory (optional, to optimize the process)
let cachedChunks = {};

// chunking
const preloadChunks = async (songPath) => {
    try {
        const totalDuration = await getSongDuration(songPath);  // Wait for song duration
        const totalChunks = Math.ceil(totalDuration / chunkSize);  // Calculate total number of chunks

        let chunkPromises = [];

        for (let i = 0; i < totalChunks; i++) {
            const startTime = i * chunkSize;
            const chunkFilePath = path.join(cacheDir, `chunk_${i}.mp3`);

            // Cache the chunk (store it in a file or memory)
            chunkPromises.push(
                new Promise((resolveChunk, rejectChunk) => {
                    ffmpeg(songPath)
                        .setStartTime(startTime)
                        .duration(chunkSize)
                        .audioCodec('libmp3lame')
                        .format('mp3')
                        .output(chunkFilePath)
                        .on('end', () => {
                            cachedChunks[startTime] = chunkFilePath; 
                            resolveChunk();
                        })
                        .on('error', rejectChunk)
                        .run();
                })
            );
        }

        
        await Promise.all(chunkPromises);
        console.log('Chunks have been successfully preloaded');
    } catch (err) {
        console.error('Error preloading chunks:', err);
    }
};

// get song duration
const getSongDuration = (songPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(songPath, (err, metadata) => {
            if (err) reject(err);
            resolve(metadata.format.duration);
        });
    });
};

// Start playback
const startPlayback = () => {
    // if (songQueue.length === 0) return;
    console.log("chunking started");


    currentSong = mp3FilePath;  // Get the current song from the queue , currently hardcoded
    preloadChunks(currentSong)   // Preload the chunks
        .then(() => {
            console.log('Chunks preloaded, starting playback...');
            setInterval(() => {
                currentTime += 1;  // tick clock 1s
            }, 1000);
        })
        .catch((err) => {
            console.error('Error preloading chunks:', err);
        });
};

// serve stream requests
app.get('/stream', (req, res) => {
    if (!currentSong) {
        return res.status(404).send('No song is currently playing');
    }

    const currentChunkStart = Math.floor(currentTime / chunkSize) * chunkSize;
    const chunkFilePath = cachedChunks[currentChunkStart];

    if (!chunkFilePath) {
        return res.status(404).send('Requested chunk is not yet available');
    }

    // stream cached chunk file
    const stat = fs.statSync(chunkFilePath);
    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader('Content-Length', stat.size);

    const readStream = fs.createReadStream(chunkFilePath);
    readStream.pipe(res);
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    startPlayback();  
});

