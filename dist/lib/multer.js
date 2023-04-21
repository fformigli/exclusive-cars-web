"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
const multer = require('multer');
const path = require('path');
exports.uploads = multer({
    storage: multer.diskStorage({
        filename: function (req, file, done) {
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            done(null, Date.now() + ext);
        },
        destination: path.join(__dirname, '../public/uploads')
    })
});
