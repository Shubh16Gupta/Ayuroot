const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generateMedicineRecommendation(symptom) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing");

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `You are an expert Ayurvedic doctor and medicine specialist.

Based on the symptom: "${symptom}"

Provide ONE recommended Ayurvedic medicine in JSON format with these fields:
- name: Medicine name (in English)
- description: 2-3 lines explaining what it treats and how it works
- dosage: How to take (e.g., "1 teaspoon twice daily with warm water")
- precautions: Important warnings or who should avoid it
- ingredients: Main herbal ingredients (comma-separated)
- benefits: 2-3 key benefits

Return ONLY valid JSON, no markdown:

{
  "name": "medicine name",
  "description": "description here",
  "dosage": "dosage instructions",
  "precautions": "precautions",
  "ingredients": "ingredient1, ingredient2, ingredient3",
  "benefits": "benefit1, benefit2, benefit3"
}`;

  try {
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (err) {
    console.error("AI recommendation error:", err.message);
    throw new Error("Failed to generate medicine recommendation");
  }
}

module.exports = { generateMedicineRecommendation };