const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;


const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));


app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("./config/database").connect();

const user = require("./routes/authRoutes");
app.use("/api/v1", user);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/v1", chatRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

const medicineRoutes = require("./routes/medicineRoutes");
app.use("/api/v1/medicine", medicineRoutes);


const lifestyleRoutes = require("./routes/lifestyleRoutes");
app.use("/api/v1/lifestyle", lifestyleRoutes);

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
  });
}

module.exports = app;