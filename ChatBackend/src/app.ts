import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Talksy",
    description: "A real-time chat app built with Socket.IO and React.",
    createdAt: new Date("2025-05-24"),
  });
});

export default app;