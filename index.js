const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Replace with actual API keys
const OPENAI_API_KEY = "your_openai_api_key";
const GEMINI_API_KEY = "your_gemini_api_key";
const COPILOT_API_KEY = "your_copilot_api_key";

async function fetchChatGPTResponse(query) {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = { Authorization: Bearer ${OPENAI_API_KEY}, "Content-Type": "application/json" };
    const data = { model: "gpt-4", messages: [{ role: "user", content: query }] };
    const response = await axios.post(url, data, { headers });
    return response.data.choices?.[0]?.message?.content || "No response";
}

async function fetchGeminiResponse(query) {
    const url = https://gemini.googleapis.com/v1/generateText?key=${GEMINI_API_KEY};
    const data = { prompt: { text: query }, model: "gemini-pro" };
    const response = await axios.post(url, data);
    return response.data.candidates?.[0]?.output || "No response";
}

async function fetchCopilotResponse(query) {
    const url = "https://api.copilot.microsoft.com/v1/chat/completions";
    const headers = { Authorization: Bearer ${COPILOT_API_KEY}, "Content-Type": "application/json" };
    const data = { model: "copilot", messages: [{ role: "user", content: query }] };
    const response = await axios.post(url, data, { headers });
    return response.data.choices?.[0]?.message?.content || "No response";
}

app.post('/get_responses', async (req, res) => {
    try {
        const { query } = req.body;
        
        const [chatGPT, gemini, copilot] = await Promise.all([
            fetchChatGPTResponse(query),
            fetchGeminiResponse(query),
            fetchCopilotResponse(query)
        ]);
        
        res.json({ ChatGPT: chatGPT, Gemini: gemini, Copilot: copilot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});