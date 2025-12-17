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
    type: String,
    unique: true,
  },
  category: {
    type: String,
  },
});

export default mongoose.model("Products", Product);
