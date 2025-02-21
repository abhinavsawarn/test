import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Route to fetch AI responses
app.post('/api/query', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const [chatGPTResponse, geminiResponse, copilotResponse] = await Promise.all([
            fetchChatGPT(query),
            fetchGemini(query),
            fetchCopilot(query)
        ]);

        res.json({
            ChatGPT: chatGPTResponse,
            Gemini: geminiResponse,
            Copilot: copilotResponse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching AI responses' });
    }
});

// Function to get response from ChatGPT
async function fetchChatGPT(query) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: query }]
        }, {
            headers: { 'Authorization': Bearer ${process.env.OPENAI_API_KEY} }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        return 'Error fetching ChatGPT response';
    }
}

// Function to get response from Gemini (Google AI)
async function fetchGemini(query) {
    try {
        const response = await axios.post(https://gemini.googleapis.com/v1/generateText?key=${process.env.GEMINI_API_KEY}, {
            prompt: query
        });
        return response.data.candidates[0].output;
    } catch (error) {
        return 'Error fetching Gemini response';
    }
}

// Function to get response from Copilot (Microsoft AI)
async function fetchCopilot(query) {
    try {
        const response = await axios.post('https://api.microsoft.com/copilot-endpoint', {
            prompt: query
        }, {
            headers: { 'Authorization': Bearer ${process.env.COPILOT_API_KEY} }
        });
        return response.data.output;
    } catch (error) {
        return 'Error fetching Copilot response';
    }
}

app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
