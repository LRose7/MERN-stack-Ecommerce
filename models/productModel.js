const mongoose = require('mongoose');

const  ProductSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;