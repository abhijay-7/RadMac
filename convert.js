import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Function to convert MP3 file to different bitrate
function convertMP3(inputFile, bitrate) {
  // Check if the input file exists
  if (!fs.existsSync(inputFile)) {
    console.error('Input file does not exist.');
    return;
  }

  // Get the file extension and name
  const extname = path.extname(inputFile);
  const basename = path.basename(inputFile, extname);
  console.log(path.dirname(inputFile))
  // Output file name with appended bitrate
  const outputFolder = path.join("assets","currentStream");

  // Ensure that the output directory exists
  if (!fs.existsSync(outputFolder)) {
    console.error('Output folder does not exist.');
    return;
  }


  const outputFile = path.join(
    outputFolder,
    `${basename}_${bitrate}${extname}`
  );

  // Perform the conversion using FFmpeg
  ffmpeg(inputFile)
    .audioBitrate(bitrate)
    .save(outputFile)
    .on('end', () => {
      console.log(`File converted successfully: ${outputFile}`);
    })
    .on('error', (err) => {
      console.error(`Error during conversion: ${err.message}`);
    });
}
const inputFile = path.join("assets/music/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3")
function convertandserve(inputFile){
  convertMP3(inputFile, '128k');
  convertMP3(inputFile, '192k');
  convertMP3(inputFile, '256k');
  convertMP3(inputFile, '320k');


}
convertandserve(inputFile);
// Example usage: Convert an MP3 to 128k bitrate
