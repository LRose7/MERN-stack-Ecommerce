const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../models/productModel');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


// upload image file to the database route
router.post('/uploadphoto', upload.single('image'), async (req, res) => {
    try {
        const image = fs.readFileSync(req.file.path);
        const encode_image = image.toString('base64');

        // define a JSON Object for the image
        const finalImage = {
            contentType: req.file.mimetype,
            path: req.file.path,
            image: new Buffer(encode_image, 'base64')
        };
        // insert image into database
        db.collection('image').insertOne(finalImage, (err, result) => {
            console.log(result);
            if (err) {
                return console.log(err);
            } else {
                console.log("Saved to database");
                res.contentType(finalImage.contentType);
                res.send(finalImage.image);
            }
        });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});






// upload single file route
// router.post('/', upload.single('image'), (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//         const error = new Error("Please upload a file.");
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
// });

// upload multiple files route
// router.post('/multiple', upload.array('images', 12), (req, res, next) => {
//     const files = req.files;
//     if (!files) {
//         const error = new Error("Please Choose Files.");
//         error.httpStatusCode = 400;
//         return next(error);
//     }

//     // no error
//     res.send(files);
// });

module.exports = router;