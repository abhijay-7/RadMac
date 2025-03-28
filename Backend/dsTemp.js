import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { clearInterval, setInterval } from 'timers';
import { getFilesInDirectory } from './utilities/file_utils.js';
import { getSongDuration } from './utilities/ffmpeg_utils.js';

const app = express();
const mp3FolderPath = "assets/music/";
const cacheDir = path.join('cache');
const chunkSize = 8;
const bitrates = ["128k", "192k", "256k", "320k"];

// Initialize server state
let serverState = {
    songQueue: [],
    currentSong: null,
    currentTime: 0,
    currentChunk: 0,
    activeInterval: null,
    globalChunkIndex: 0,
    clients: new Set(),
    preloading: false
};

// Initialize cache directory
fs.ensureDirSync(cacheDir);

// Preloading system
const preloadNextSong = async (currentSongIndex) => {
    const nextIndex = (currentSongIndex + 1) % serverState.songQueue.length;
    const nextSong = serverState.songQueue[nextIndex];
    
    try {
        const totalDuration = await getSongDuration(nextSong);
        const totalChunks = Math.ceil(totalDuration / chunkSize);
        
        const chunkPromises = [];
        for (let i = 0; i < totalChunks; i++) {
            const globalChunkIndex = serverState.globalChunkIndex + i;
            for (const bitrate of bitrates) {
                const chunkPath = path.join(cacheDir, `chunk_${globalChunkIndex}_${bitrate}.mp3`);
                if (fs.existsSync(chunkPath)) continue;

                chunkPromises.push(new Promise((resolve, reject) => {
                    ffmpeg(nextSong)
                        .setStartTime(i * chunkSize)
                        .duration(chunkSize)
                        .audioCodec('libmp3lame')
                        .audioBitrate(bitrate)
                        .output(chunkPath)
                        .on('end', resolve)
                        .on('error', reject)
                        .run();
                }));
            }
        }
        
        await Promise.all(chunkPromises);
        console.log(`Preloaded ${totalChunks} chunks for next song`);
    } catch (error) {
        console.error('Preloading failed:', error);
    }
};

// Playback management
const updateSongQueue = async () => {
    try {
        serverState.songQueue = await getFilesInDirectory(mp3FolderPath);
        console.log('Updated song queue:', serverState.songQueue);
    } catch (error) {
        console.error('Failed to update song queue:', error);
    }
};

const startPlayback = async (songIndex = 0) => {
    await updateSongQueue();
    serverState.currentSong = serverState.songQueue[songIndex];
    if(songIndex==0)preloadNextSong(songIndex-1);
    serverState.currentTime = 0;
    serverState.currentChunk=0;
    serverState.preloading = false
    console.log(`Now playing: ${serverState.currentSong}`);

    try {
        const duration = await getSongDuration(serverState.currentSong);
        const totalChunks = Math.ceil(duration / chunkSize);
        const preloadThreshold = Math.floor(totalChunks * 0.6);

        serverState.activeInterval = setInterval(() => {
            serverState.currentTime++;
            serverState.currentChunk = Math.floor(serverState.currentTime / chunkSize);

            // Check for song completion
            if (serverState.currentTime >= duration) {
                clearInterval(serverState.activeInterval);
                serverState.globalChunkIndex += totalChunks;
                return startPlayback((songIndex + 1) % serverState.songQueue.length);
            }

            // Trigger preloading at 60% completion
            if (serverState.currentChunk >= preloadThreshold && !serverState.preloading) {
                serverState.preloading = true;
                preloadNextSong(songIndex);
            }

            // Broadcast updates to all clients
            broadcastUpdate();
        }, 1000);

    } catch (error) {
        console.error('Playback failed:', error);
    }
};

// Client communication
const broadcastUpdate = () => {
    const data = JSON.stringify({
        time: serverState.currentTime,
        chunk: serverState.currentChunk,
        song: path.basename(serverState.currentSong)
    });

    serverState.clients.forEach(client => {
        if (client.writable) client.write(`data: ${data}\n\n`);
    });
};

// // Streaming endpoints
// app.get('/stream/:bitrate', (req, res) => {
//     const bitrate = bitrates.includes(req.params.bitrate) ? req.params.bitrate : '320k';
//     res.set({
//         'Content-Type': 'audio/mpeg',
//         'Cache-Control': 'no-cache',
//         'Transfer-Encoding': 'chunked'
//     });

//     let chunkIndex = serverState.globalChunkIndex + Math.floor(serverState.currentTime / chunkSize);
    
//     const streamChunk = () => {
//         const chunkPath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
        
//         if (fs.existsSync(chunkPath)) {
//             fs.createReadStream(chunkPath)
//                 .pipe(res, { end: false })
//                 .on('end', () => {
//                     chunkIndex++;
//                     streamChunk();
//                 });
//         } else {
//             setTimeout(streamChunk, 500);
//         }
//     };

//     streamChunk();
// });
app.get('/stream/:bitrate', (req, res) => {
    const bitrate = bitrates.includes(req.params.bitrate) ? req.params.bitrate : '320k';
    res.set({
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
    });

    let chunkIndex = serverState.globalChunkIndex + Math.floor(serverState.currentTime / chunkSize);
    
    const getMaxAllowedChunk = () => {
        const currentBase = serverState.globalChunkIndex + Math.floor(serverState.currentTime / chunkSize);
        return currentBase + 3; // Allow 3 chunks ahead
    };

    const streamChunk = () => {
        const maxAllowed = getMaxAllowedChunk();
        
        // Don't stream if too far ahead
        if (chunkIndex > maxAllowed) {
            setTimeout(streamChunk, 500);
            return;
        }

        const chunkPath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
        
        if (fs.existsSync(chunkPath)) {
            fs.createReadStream(chunkPath)
                .pipe(res, { end: false })
                .on('end', () => {
                    chunkIndex++;
                    streamChunk();
                });
        } else {
            setTimeout(streamChunk, 500);
        }
    };

    streamChunk();
});



// Synchronization endpoint
app.get('/sync', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const client = {
        id: Date.now(),
        write: data => res.write(data),
        writable: true
    };

    serverState.clients.add(client);
    req.on('close', () => serverState.clients.delete(client));
});

// Server initialization
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    startPlayback();
});