const router = require('express').Router();
const Product = require('../models/productModel');
const multer = require('multer');
const fs = require('fs');

// define storage for the images
const storage = multer.diskStorage({
    // destination for files
    destination(req, file, cb) {
        cb(null, './client/public/uploads');
    },

    // add back the extension
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname);
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// upload parameters for multer
const upload = multer({
     storage: storage
});


router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found.' });
    }
    });

router.post("/", upload.single('image'), async (req, res) => {
    try {
        console.log(req.file);

        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            countInStock: req.body.countInStock,
        });
        const newProduct = await product.save();
        if(newProduct) {
            return res.status(201).send({ message: "New Product Created.", data: newProduct});
        } else {
        return res.status(500).send({ message: "Error in Creating Product."});
        }

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.category = req.body.category;
        product.description = req.body.description;
        product.rating = req.body.rating;
        product.numReviews = req.body.numReviews;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).json({ message: "Product Updated", data: updatedProduct });
        }
    } else {
        return res.status(500).json({ message: "Error Updating Product" });
    }
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: "Product Deleted." });
    } else {
        res.send( "Error in Deletion");
    }
});

module.exports = router;