const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // file path from uploads
  description: { type: String },
  createdBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
