const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true, minlength: 5},
    isAdmin: { type: Boolean, required: true, default: false },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;