import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  saveProduct,
  updateProduct,
  searchProducts,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", saveProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/search", searchProducts);

export default router;
