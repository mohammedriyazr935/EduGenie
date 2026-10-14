require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/ask", async (req, res) => {
    const question = String(req.body.question || "").trim();

    if (!question) {
        return res.status(400).json({
            error: "Please enter a question."
        });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: "Gemini API key is missing from .env"
        });
    }

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are EduGenie, a friendly learning assistant. Explain in simple language:\n${question}`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);
            return res.status(response.status).json({
                error: data.error?.message || "Gemini API request failed."
            });
        }

        const answer =
            data.candidates?.[0]?.content?.parts
                ?.map(part => part.text || "")
                .join("\n");

        res.json({
            answer: answer || "No answer was returned. Please try again."
        });

    } catch (error) {
        console.error("Server error:", error.message);

        res.status(500).json({
            error: "Unable to connect to the Gemini API."
        });
    }
});

app.listen(PORT, () => {
    console.log(`EduGenie running at http://localhost:${PORT}`);
});