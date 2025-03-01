import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { clearInterval, setInterval } from 'timers';
import {getFilesInDirectory } from './utilities/file_utils.js'
import { getSongDuration } from './utilities/ffmpeg_utils.js';



const app = express();
const mp3FoldPath = "assets/music/";

const mp3FilePath = path.join("assets/music/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3");
const cacheDir = path.join('cache');
fs.ensureDirSync(cacheDir);

const chunkSize = 8; 
let songQueue = [mp3FilePath];  
let currentSong = null;
let currentTime = 0;
let currentChunk=0;
let index=0;
let interval_id ;
let bits = ["128k", "192k", "256k","320k"];
let globalPrevIndex = 0;

//creating hashmap To avoid overlapping chunk generation for all bitrates
let chunkLoadingInProgress ={};
chunkLoadingInProgress["128k"] = false;
chunkLoadingInProgress["192"] = false;
chunkLoadingInProgress["256k"] = false;
chunkLoadingInProgress["320k"] = false;
let clients = []; // Track connected clients for synchronization

// prechunking
const preloadChunks = async (songPath) => {
    try {
        const totalDuration = await getSongDuration(songPath);  
        const totalChunks = Math.ceil(totalDuration / chunkSize);  

        let chunkPromises = [];
        console.log(`preloading: ${globalPrevIndex}`)
        
        for (let k = globalPrevIndex,i=0; k < globalPrevIndex+totalChunks; i++,k++) {
            for(let j=0; j<4;j++){
                    const startTime = i * chunkSize;
                    const chunkFilePath = path.join(cacheDir, `chunk_${k}_${bits[j]}.mp3`);
        
                    // Cache the chunk
                    chunkPromises.push(
                        new Promise((resolveChunk, rejectChunk) => {
                            ffmpeg(songPath)
                                .setStartTime(startTime)
                                .duration(chunkSize)
                                .audioCodec('libmp3lame')
                                .format('mp3')
                                .audioBitrate(bits[j])
                                .output(chunkFilePath)
                                .on('end', resolveChunk)
                                .on('error', rejectChunk) 
                                .run(); 
                                
                        })

                    );
                }

        }
        await Promise.all(chunkPromises);
        console.log('Chunks have been successfully preloaded');
    }
    
    catch (err) {
    console.error('Error preloading chunks:', err);
}
};

const updateSongQueue = async() =>{
    songQueue = await getFilesInDirectory(mp3FoldPath);
    console.log(songQueue);
}


// // Function to handle chunk loading, for live data scenario
// const loadNextChunk = async (bitrate="128k") => {
//     if (chunkLoadingInProgress[bitrate]) return;  // Avoid overlapping chunk generation
//     chunkLoadingInProgress[bitrate] = true;

//     const currentChunkStart = Math.floor(currentTime / chunkSize) * chunkSize;
//     const chunkIndex = Math.floor(currentChunkStart / chunkSize);

//     const chunkFilePath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
    
//     if (!fs.existsSync(chunkFilePath)) {
//         console.log(`loadnextCHunk:${chunkFilePath} `);
//         console.log(`Generating chunk ${chunkIndex} starting at ${currentChunkStart}s...`);
//         try {
//             await generateChunk(currentSong, currentChunkStart, chunkIndex,bitrate);
//             console.log(`Chunk ${chunkIndex} generated.`);
//         } catch (err) {
//             console.error('Error generating chunk:', err);
//         }
//     }

//     chunkLoadingInProgress[bitrate] = false;
// };
// const loadNextChunks = async() =>{
//     for(let j=0; j<4;j++){
//         loadNextChunk(bits[j]);
//     }
    
// }

// Broadcast function to notify clients of current playback time
const broadcastTimeUpdate = () => {
    clients.forEach(client => {
        if (client.res.writable) {
            client.res.write(`data: ${currentTime}\n\n`);
        }
    });
};

// Start playback and set interval for time tracking
const startPlayback = async(index=0) => {
    await updateSongQueue()
    currentSong = songQueue[index];  
    console.log(`playing : ${currentSong}`);
    preloadChunks(currentSong);
    currentTime = 0;
    currentChunk=0;

    getSongDuration(currentSong)
        .then((duration) => {
            console.log(`Song duration: ${duration}s`);
            let maxChunks = Math.ceil(duration/chunkSize)
           interval_id= setInterval(() => {
                currentTime += 1;
                if(currentTime%chunkSize == 0)currentChunk++;
                if(currentChunk>maxChunks){
                    index = (index+1)%songQueue.length;
                    globalPrevIndex += maxChunks; 
                    clearInterval(interval_id);
                    console.log("hi", maxChunks);
                    startPlayback(index);
                    
                    
                }
                
                // loadNextChunks();  // Check and load the next chunk as the time progresses for live
                broadcastTimeUpdate();  // Notify clients of the time update
            }, 1000);
        })
        .catch((err) => {
            console.error('Error getting song duration:', err);
        });
};

app.get('/stream/:bitrate', (req, res) => {

    if (!currentSong) {
        return res.status(404).send('No song is currently playing');
    }
 

    const size = req.params.bitrate;
    console.log(size);
    let bitrate = "320k";
    if(size == "128k")  bitrate = "128k";
    else if(size == "192k")  bitrate = "192k";
    if(size == "256k")  bitrate = "256k";

     //  an audio stream headers
     res.setHeader('Content-Type', 'audio/mp3');
     res.setHeader('Transfer-Encoding', 'chunked'); // Keep the connection open
     res.setHeader('Cache-Control', 'no-cache'); 
 
     //  chunk streaming boss function 
     const streamChunks = (bitrate) => {

         let chunkIndex = globalPrevIndex+ Math.floor(currentTime / chunkSize); // Calculate chunk index
 
         const sendChunk = (bitrate, presIndex) => {
             const chunkFilePath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
             console.log(`sendchunk before: ${chunkFilePath}`);
            

             if (fs.existsSync(chunkFilePath)) {
                 const readStream = fs.createReadStream(chunkFilePath);
 
                 // Pipe the chunk to the response (client)
                 readStream.pipe(res, { end: false }); // Prevent closing the connection after this chunk
                 readStream.on('end', () => {
                     // Once the chunk is sent, move to the next chunk
                    chunkIndex++;
                     sendChunk(bitrate,presIndex); // Recursively send the next chunk
                 });
             } else {
                
                 console.log(`Send Chunk ${chunkIndex} is not available yet`);
                 setTimeout(() => sendChunk(bitrate, chunkIndex), 1000); // Retry after 1 second
             }
         };
 
         console.log(index)
         sendChunk(bitrate,index); 
     };
 
     //start stream
     streamChunks(bitrate);




});

app.get('/stream', (req, res) => {
    if (!currentSong) {
        return res.status(404).send('No song is currently playing');
    }

    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    const streamChunks = () => {
        let chunkIndex = Math.floor(currentTime / chunkSize); 

        const sendChunk = (bitrate="320k") => {
            const chunkFilePath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
            
            
            if (fs.existsSync(chunkFilePath)) {
                const readStream = fs.createReadStream(chunkFilePath);

                readStream.pipe(res, { end: false }); // Prevent closing the connection after this chunk
                readStream.on('end', () => {
                  
                    chunkIndex++;
                    sendChunk("320k"); // Recursively send the next chunk
                });
            } else {
                console.log(`Chunk ${chunkIndex} is not available yet`);
                setTimeout(()=>sendChunk(bitrate), 1000); 
            }
        };

        sendChunk("320k"); 
    };

    streamChunks("320k");
});

// Stream synchronization endpoint
app.get('/sync', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write('data: connected\n\n'); // Confirm connection

    // Add this client to the list for synchronization
    clients.push({ res });

    req.on('close', () => {
        clients = clients.filter(client => client.res !== res);
    });
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
    startPlayback(index);  
});
