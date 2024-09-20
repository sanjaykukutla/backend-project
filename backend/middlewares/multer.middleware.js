import multer from 'multer';
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();
const tempDir = path.join(__dirname, './public/temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({
     storage: storage
 })