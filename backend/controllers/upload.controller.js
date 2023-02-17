import express from 'express';
import multer from 'multer';

const uploadController = express.Router();

// destination -> where the image will be saved
// filename -> what will be the name of the saved image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    }
});

export const upload = multer({
    storage,
});

uploadController.post('/image', upload.single('image'), async (req, res) => {
    try {
        return res.status(200).json('File uploded successfully!');
    } catch (err) {
        console.error(err);
    }
});

export default uploadController;
