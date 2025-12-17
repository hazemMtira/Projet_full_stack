import Product from "../models/ProductModel.js";

// Helper function to check and emit low stock notification
const checkLowStock = (io, product) => {
  if (product.stock <= 5) {
    io.emit("lowStockAlert", {
      id: product._id,
      name: product.name,
      stock: product.stock,
      barcode: product.barcode,
      message: `Low stock alert: ${product.name} has only ${product.stock} units remaining!`,
    });
    console.log(
      `Low stock alert emitted for: ${product.name} (Stock: ${product.stock})`
    );
  }
};

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

    // Get Socket.IO instance and check for low stock
    const io = req.app.get("io");
    checkLowStock(io, insertedProduct);

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

    // Get Socket.IO instance and check for low stock
    const io = req.app.get("io");
    checkLowStock(io, updatedProduct);

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
