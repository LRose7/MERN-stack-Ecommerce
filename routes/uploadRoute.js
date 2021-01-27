const router = require('express').Router();
const multer = require('multer');
const { isAuth } = require('../utils');

// define storage for the images
const storage =  multer.diskStorage({
    // destination for files
    destination (req, file, cb) {
        cb(null, 'uploads');
    },
    // add back the extension
    filename (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}

// upload parameters for multer
const upload = multer({ storage: storage, filefilter: filefilter });

router.post('/', isAuth, upload.single('image'), (req, res) => {
    try {
        res.send(`/${req.file.path}`);

    } catch (error) {
        res.status(400).send(error.message);

    }
})

module.exports =  router