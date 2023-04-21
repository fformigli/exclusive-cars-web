import { Request } from "express";

const multer = require('multer');
const path = require('path');

export const uploads = multer({
  storage: multer.diskStorage({
    filename: function (req: Request, file: any, done: any) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      done(null, Date.now() + ext);
    },
    destination: path.join(__dirname, '../public/uploads')
  })
})

