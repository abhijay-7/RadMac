import fs from 'fs-extra';
import path from 'path';


export const getFilesInDirectory = (dirPath) => {
    return new Promise((resolve, reject) => {
      
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          reject(`Error reading directory: ${err}`);
        } else {
        
          const filePaths = files.map(file => path.join(dirPath, file))
                                 .filter(filePath => fs.statSync(filePath).isFile());
          resolve(filePaths); 
        }
      });
    });
};



// Function to delete all files and subdirectories in a directory
export function cleanDirectory(dirPath) {
  // Get all items (files and directories) in the specified directory
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Loop through each file or directory
    files.forEach((file) => {
      const fullPath = path.join(dirPath, file); // Get full path

      // Check if it's a directory or file
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error('Error checking file stats:', err);
          return;
        }

        if (stats.isDirectory()) {
          // If it's a directory, recursively clean it
          cleanDirectory(fullPath);
        } else {
          // If it's a file, delete it
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log(`Deleted file: ${fullPath}`);
            }
          });
        }
      });
    });

    // After deleting all files and subdirectories, remove the directory itself
    fs.rmdir(dirPath, (err) => {
      if (err) {
        console.error('Error deleting directory:', err);
      } else {
        console.log(`Deleted directory: ${dirPath}`);
      }
    });
  });
}

// // Example usage
// const directoryToClean = path.join(__dirname, 'your-directory'); // Replace with the directory path you want to clean
// cleanDirectory(directoryToClean);
