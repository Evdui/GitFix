const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/explain", async (req, res) => {
  const { error } = req.body;

  if (!error || !error.trim()) {
    return res.status(400).json({
      error: "Please provide a Git error."
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are GitFix, a Git error troubleshooting assistant for beginners.

            Analyze the Git error provided by the user and give a clear, accurate explanation.

            Always structure your response using exactly these sections:

            ### What Happened
            Explain what the error means in simple language.

            ### Why It Happened
            Explain the likely cause or causes.

            ### How to Fix It
            Give clear step-by-step commands or actions the user should take.
            Put Git commands inside backticks.

            ### Warning
            Only include this section if a command could cause data loss, overwrite changes, force-push, or otherwise be risky.
            If there is no important warning, omit this section.

            Do not invent information that cannot be determined from the error.
            Prefer safe commands and explain what each important command does.
            Keep the explanation beginner-friendly and concise.
            `
        },
        {
          role: "user",
          content: `Explain this Git error:\n\n${error}`
        }
      ]
    });

    const explanation = completion.choices[0].message.content;

    res.json({ explanation });
  } catch (err) {
    console.error("AI request failed:", err.message);

    res.status(500).json({
      error: "Failed to generate an explanation."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});