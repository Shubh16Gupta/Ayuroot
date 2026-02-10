const { GoogleGenerativeAI } = require("@google/generative-ai");

// Stream Gemini response in chunks using a for loop
exports.streamChatWithAI = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');

  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      res.write(`data: ${JSON.stringify({ error: "Message is required" })}\n\n`);
      return res.end();
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a friendly Ayurveda wellness advisor. Respond naturally and conversationally.

If the user says casual things like "hi", "hello", "how are you", etc. - respond warmly and ask how you can help with their health.

If they ask about health/symptoms, provide quick, practical Ayurvedic advice like a knowledgeable friend would (not a doctor, but a wellness expert).

Keep responses conversational, warm, and 50-200 words. No excessive formatting.

User message: "${message}"`;
    
    const result = await model.generateContent([prompt]);
    const fullText = result.response.candidates[0].content.parts[0].text;

    // Stream response in chunks using for loop
    const chunkSize = 30;
    for (let i = 0; i < fullText.length; i += chunkSize) {
      const chunk = fullText.slice(i, i + chunkSize);
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

  } catch (error) {
    console.error("Stream Chat Error:", error.message || error);
    res.write(`data: ${JSON.stringify({ error: error.message || "Failed to generate response" })}\n\n`);
    res.end();
  }
};

// Standard chat endpoint (fallback)
exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const prompt = `You are a friendly Ayurveda wellness advisor. Respond naturally and conversationally.

If the user says casual things like "hi", "hello", "how are you", etc. - respond warmly and ask how you can help with their health.

If they ask about health/symptoms, provide quick, practical Ayurvedic advice like a knowledgeable friend would (not a doctor, but a wellness expert).

Keep responses conversational, warm, and 50-200 words. No excessive formatting.

User message: "${message}"`;
    
    const result = await model.generateContent([prompt]);
    const response = result.response.candidates[0].content.parts[0].text;

    res.json({ success: true, response });

  } catch (error) {
    console.error("Chat Error:", error.message || error);
    res.status(500).json({ success: false, message: error.message || "Failed to generate response" });
  }
};