// services/medicineFinderAI.js
const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Main function to get medication recommendation
async function getMedicineRecommendation(symptom) {
  try {
    // Generate content with model
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are an expert Ayurvedic doctor.

User symptom: ${symptom}

Provide response strictly in this JSON format:

{
  "medicine": "Medicine name",
  "description": "What it does",
  "dosage": "How to use",
  "buyLink": "Link to buy online"
}

Rules:
- Recommend only real Ayurvedic medicines.
- Be clear, professional, and safe.
- Do not provide harmful advice.
- Respond in valid JSON only.
`
    });

    // Clean and parse JSON
    const text = response.text.trim();
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "");

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("AI recommendation error:", error);

    // Return fallback object on error
    return {
      medicine: "Error",
      description: "Failed to get recommendation",
      dosage: "",
      buyLink: ""
    };
  }
}

module.exports = { getMedicineRecommendation };