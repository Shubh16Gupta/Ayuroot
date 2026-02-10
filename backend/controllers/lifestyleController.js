const runLifestyleModel = require("../services/runLifestyleModel");
const axios = require("axios");

// Gemini advice function
async function getGeminiAdvice(suggestion) {
  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `The user received this lifestyle suggestion: "${suggestion}". Explain clearly how they can improve it with daily routines, exercises, diet, and practical steps.`
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.error(
      "Gemini API error:",
      error.response?.data || error.message
    );

    return "AI advice unavailable.";
  }
}

exports.lifestyle = async (req, res) => {
  try {
    // Run ML model
    const result = await runLifestyleModel(req.body);

    // Get Gemini advice for each suggestion
    const enhancedSuggestions = await Promise.all(
      result.suggestions.map(async (suggestion) => ({
        original: suggestion,
        advice: await getGeminiAdvice(suggestion)
      }))
    );

    // IMPORTANT: Send metrics for radar chart
    const metrics = {
      sleep: req.body.sleep_avg,
      food: req.body.food_avg,
      exercise: req.body.exercise_avg,
      stress: req.body.stress_avg,
      energy: req.body.energy_avg,
      water: req.body.water_avg
    };

    res.json({
      success: true,
      data: {
        score: result.score,
        status: result.status,
        suggestions: result.suggestions,
        enhancedSuggestions: enhancedSuggestions,
        metrics: metrics
      }
    });

  } catch (err) {
    console.error("Lifestyle Controller Error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};