// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

// Define the configuration object for the FileInterceptor
export const multerStorageConfig = {
  storage: diskStorage({
    destination: './uploads/thumbnails', // ⬅️ Destination folder for saved files
    filename: (req, file, cb) => {
      // Create a unique, random filename
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // Append the original file extension
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  // Optional: Filter to accept only common image types
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
};
