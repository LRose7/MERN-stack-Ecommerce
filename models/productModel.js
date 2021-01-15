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

const  ProductSchema = new mongoose.Schema ({
    name: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        default: 0
    },
    category: { type: String },
    countInStock: {
        type: Number,
        default: 0
    },
    description: { type: String },
    rating: {
        type: Number,
        default: 0
     },
    numReviews: {
        type: Number,
        default: 0
     },
     reviews: [reviewSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;