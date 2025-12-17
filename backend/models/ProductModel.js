import mongoose from "mongoose";

const Product = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  barcode: {
    type: Number,
    unique: true,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Products", Product);
