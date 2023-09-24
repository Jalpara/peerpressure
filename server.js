const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const app = express();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = 'AIzaSyDyp4XIL3MIYsbjgzeLhRZehczgidtXBP0'; // Ensure you keep this secret

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

app.use(bodyParser.json());
app.use(cors()); // This will allow your frontend to call this backend

app.post('/generateNews', async (req, res) => {
    const { newsType, location } = req.body;

    const userPrompt = `Generate a news summary about ${newsType} in ${location} of last 24 hours.`;
    try {
        const result = await client.generateMessage({
            model: MODEL_NAME,
            temperature: 0.5,
            candidateCount: 1,
            prompt: {
                context: "News generation engine",
                examples: [
                    {
                        input: { content: "Give me a summary of tech news in New York" },
                        output: { content: "In New York, tech news is buzzing with the latest startup acquisitions and innovations." }
                    }
                ],
                messages: [{ content: userPrompt }]
            }
        });

        res.json(result[0].candidates[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate news.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
