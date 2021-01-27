const mongoose = require('mongoose');
 // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

 const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, dropDups: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false, required: true },
      isSeller: { type: Boolean, default: false, required: true },
      seller: {
        name: String,
        logo: String,
        description: String,
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
      },
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model("User", userSchema);

module.exports = User;