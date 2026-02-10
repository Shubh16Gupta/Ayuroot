const express = require("express");

const router = express.Router();

// correct import
const { chatWithAI, streamChatWithAI } = require("../controllers/chatController");



// Standard chat endpoint
router.post("/chat", chatWithAI);

// Streaming chat endpoint
router.post("/chat/stream", streamChatWithAI);


module.exports = router;