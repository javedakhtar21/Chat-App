import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./modules/auth/routes";
import userRoutes from "./modules/users/routes";
import { cityRouter } from "./modules/data/city/routes";
import { stateRouter } from "./modules/data/state/routes";
import { UserConnectionRouter } from "./modules/user-connection/routes";
import { ConversationRouter } from "./modules/conversation/routes";
import { MessageRouter } from "./modules/message/router";
import { authMiddleware } from "./middleware/middleware";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/talksy")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authMiddleware, userRoutes);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/states", stateRouter);
app.use("/api/v1/connection", UserConnectionRouter);
app.use("/api/v1/conversations", authMiddleware, ConversationRouter);
app.use("/api/v1/messages", authMiddleware, MessageRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Talksy",
    description: "A real-time chat app built with Socket.IO and React.",
    createdAt: new Date("2025-05-24"),
  });
});

export default app;