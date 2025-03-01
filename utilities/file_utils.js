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