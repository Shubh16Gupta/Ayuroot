const { generateMedicineRecommendation } = require("../services/medicineAI");

exports.getMedicine = async (req, res) => {
  try {
    const { symptom } = req.body;
    if (!symptom || !symptom.trim()) {
      return res.status(400).json({ success: false, message: "Symptom is required" });
    }

    const aiResponse = await generateMedicineRecommendation(symptom);

    let medicineData;
    try {
      // Clean response of any markdown formatting
      const cleaned = aiResponse.replace(/```json|```/g, "").trim();
      medicineData = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse, parseError);
      return res.status(500).json({ success: false, message: "Failed to parse AI response" });
    }

    // Add Amazon search link for buying
    medicineData.buyLink = `https://www.amazon.in/s?k=${encodeURIComponent(medicineData.name)}`;

    res.json({ success: true, medicine: medicineData });

  } catch (error) {
    console.error("Medicine API error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};