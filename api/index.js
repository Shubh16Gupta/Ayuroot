const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect database only once, not on every request
let dbConnected = false;
const connectDB = async () => {
  if (dbConnected) return;
  try {
    await require("../../backend/config/database").connect();
    dbConnected = true;
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

// Routes
const authRoutes = require("../../backend/routes/authRoutes");
const chatRoutes = require("../../backend/routes/chatRoutes");

// Lazy connect on first request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/v1", authRoutes);
app.use("/v1", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Export for Vercel
module.exports = app;
