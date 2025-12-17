import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductRoute from "./routes/ProductRoute.js";

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
const httpServer = createServer(app);

// Express middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Make io available to routes
app.set("io", io);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Mongo error:", err));

// Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/api", ProductRoute);

// LISTEN ON ALL INTERFACES
httpServer.listen(5080, "0.0.0.0", () =>
  console.log("Server running on port 5080")
);
