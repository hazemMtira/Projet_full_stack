import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // explicitly load .env

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

// TEMP DEBUG: check that dotenv works
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use(cors());
app.use(express.json());

app.use(ProductRoute);

app.listen(5080, () => console.log("server is running"));
