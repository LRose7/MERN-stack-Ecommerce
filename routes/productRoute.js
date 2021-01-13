const router = require('express').Router();
const Product = require('../models/productModel');

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        countInStock: req.body.countInStock,
    });
    const newProduct = await product.save();
    if(newProduct) {
        return res
        .status(201)
        .send({ message: "New Product Created.", data: newProduct});
    }
    return res.status(500).send({ message: "Error in Creating Product."});
});

module.exports = router;