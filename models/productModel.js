const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String },
        rating: { type: Number, default: 0 },
        comment: { type: String },
    },
    {
        timestamps: true,
    }
);

const imageSchema = new mongoose.Schema(
    {
        img: { data: Buffer, contentType: String }
    },
    {
        timestamps: true,
    }
);


const  ProductSchema = new mongoose.Schema ({
    name: { type: String, required: true, unique: true },
    image: [imageSchema],
    price: {
        type: Number,
        default: 0
    },
    category: { type: String,  required: true },
    countInStock: {
        type: Number,
        default: 0,
        required: true
    },
    description: { type: String,  required: true },
    rating: {
        type: Number,
        default: 0,
        required: true
     },
    numReviews: {
        type: Number,
        default: 0,
        required: true
     },
     reviews: [reviewSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;