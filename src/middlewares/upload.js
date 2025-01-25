import multer from 'multer';

import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import createError from 'http-errors';

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //     cb(null, TEMP_UPLOAD_DIR);
  // }
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split('.').pop();
  if (extention === 'exe') {
    return cb(createError(400, 'files with .exe extention is not allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
