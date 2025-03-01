import ffmpeg from 'fluent-ffmpeg';

export const getSongDuration = (songPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(songPath, (err, metadata) => {
            if (err) reject(err);
            resolve(metadata.format.duration);
        });
    });
};

// Function to generate the chunk and cache it

export const generateChunk = (songPath, startTime, chunkIndex, bitrate="128k",cacheDir) => {
       
    const chunkFilePath = path.join(cacheDir, `chunk_${chunkIndex}_${bitrate}.mp3`);
    return new Promise((resolve, reject) => {
        ffmpeg(songPath)
            .setStartTime(startTime)
            .duration(chunkSize)
            .audioCodec('libmp3lame')
            .audioBitrate(bitrate)
            .format('mp3')
            .output(chunkFilePath)
            .on('end', () => {
                resolve(chunkFilePath);
            })
            .on('error', reject)
            .run();
    });
};

