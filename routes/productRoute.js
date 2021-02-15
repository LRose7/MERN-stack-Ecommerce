const router = require('express').Router();
const Product = require('../models/productModel');
const { isAuth } = require('../utils');

router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
        ? {
            name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
            },
        }
        : {};
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
        : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
    res.send(products);
});

router.get('/categories', async (req, res) => {
      const categories = await Product.find().distinct('category');
      res.send(categories);
    });

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found.' });
    }
    });

router.post("/", async (req, res) => {
    try {
        console.log(req.file);

        const product = new Product({
            name: req.body.name,
            image: req.file.image,
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
    try {
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
        
    } catch (error) {
        res.status(500).json({error: err.message});        
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