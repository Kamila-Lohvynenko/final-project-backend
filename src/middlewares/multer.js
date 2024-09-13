import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constans/index.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_UPLOAD_DIR);
    },
    filename: function ()
})