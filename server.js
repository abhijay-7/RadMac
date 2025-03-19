import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import * as mm from 'music-metadata'
import path from 'path'

const app = express();
const port = 8080


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const songFilePath = path.join("assets/genre/songs.json")
let songList = [];
// try{
//     const songdata = fs.readFileSync(songFilePath, 'utf-8');
//      songList = JSON.parse(songdata)
//      console.log("ok")

// }catch(error){
//     console.log("eror in getting data")

// }

function updateVote(checkval,id) {
    // Find the song by id
    const song = songList.find(item => item.id === id);

    // If the song is found, increment its vote
    if (song) {
        if(!checkval)
        song.votes++;
    else song.votes--;
    } else {
        console.log("Song not found");
    }
    songList.sort((a, b) => b.vote - a.vote);
}

async function getAudioFilesMetadata(directoryPath) {
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);
  
    // Filter for audio files (you can modify this regex to include other formats)
    const audioFiles = files.filter(file => /\.(mp3|flac|wav|aac|ogg)$/i.test(file));
  
    const songsMetadata = [];
    let ind =0;
    // Loop through each audio file and extract metadata
    for (const audioFile of audioFiles) {
      const audioFilePath = path.join(directoryPath, audioFile);
      
      try {
        // Read metadata
        const metadata = await mm.parseFile(audioFilePath);
  
        // Extract relevant metadata
        const songMetaData = {
          title: metadata.common.title || path.basename(audioFile, path.extname(audioFile)),
          artist: metadata.common.artist || 'Unknown Artist',
          album: metadata.common.album || 'Unknown Album',
          duration: metadata.format.duration || 0,  // in seconds
          file: audioFile,
          vote:0,
          id: ind++
        };
        console.log(songMetaData);
        songsMetadata.push(songMetaData);
      } catch (error) {
        console.error(`Error reading metadata for ${audioFile}:`, error);
      }
    }
    
    // Return the JSON list of metadata
    return songsMetadata;
  }

  async function updateList(){
    songList = await getAudioFilesMetadata("assets/music");
  }
app.get("/", (req , res)=>{
    res.json(songList);
})

app.get("/api/list", (req , res)=>{
    try {
        
        console.log("hi");
        // Send the JSON response
        res.setHeader('Cache-Control', 'no-store');

    // Send the JSON response
    console.log(songList);
    res.status(200).json(songList);
        // console.log(res);
      } catch (error) {
        console.error('Error fetching song metadata:', error);
        res.status(500).json({ error: 'Failed to fetch song metadata' });
      }
    
    // res.json(songList);
})

app.post("/api/list/top",(req , res)=>{
    console.log("post ok")
    let toUpdateId = req.body.id
    let checkval = req.body.check;
updateVote(checkval ,toUpdateId);
console.log(songList);
res.json(songList);
})

app.get("/api", (req , res)=>{
    res.send("Hii");
})

// app.post ('/api/' , (req , res)=>{
//     const name = req.body.name;
//     res.send(`Hello bhai ${name}`)
    
// })


app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
    updateList();

})