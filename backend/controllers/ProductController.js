import Product from "../models/ProductModel.js";

// get Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// save Product
export const saveProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const insertedProduct = await product.save();
    res.json(insertedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { _id: query },
        { barcode: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
