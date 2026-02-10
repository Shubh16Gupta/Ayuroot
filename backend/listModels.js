// backend/listModels.js
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function listModels() {
  try {
    const models = await ai.models.listModels();
    console.log(models);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();