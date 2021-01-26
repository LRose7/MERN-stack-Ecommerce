const router = require('express').Router();
const multer = require('multer');
const { isAuth } = require('../utils');

// define storage for the images
const storage = multer.diskStorage({
    // destination for files
    destination(req, file, cb) {
        cb(null, './client/public/uploads');
    },

    // add back the extension
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
        // cb(null, Date.now() + file.originalname);
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// upload parameters for multer
const upload = multer({ storage: storage });

router.post('/', isAuth, upload.single('image'), (req, res) =>{
    res.send(`/${req.file.path}`);
});

module.exports = router;