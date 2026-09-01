# GitFix

## The Problem

As a developer learning Git, I have personally run into confusing Git errors such as `fatal: not a git repository`, rejected pushes, merge conflicts, and GitHub permission errors. When these errors happen, it can be difficult to understand what Git is actually telling me and what command I should run next. GitFix was built to solve this problem by giving a beginner-friendly explanation of a Git error and providing safe steps to fix it.

## What It Does

GitFix takes a Git error pasted by the user and sends it to the backend. The backend sends the error to an AI model with a structured troubleshooting prompt. The AI explains what happened, why it happened, and how to fix it, with a warning when a potentially risky command is involved. The explanation is then returned to the frontend and displayed in a readable format.

## AI Integration

**API:** OpenRouter

**Model:** `openai/gpt-4o-mini`

**Location:** `backend/server.js` → `app.post("/explain")`

**What the AI does:** The AI analyzes a Git error and generates a beginner-friendly explanation containing the cause and recommended steps to fix it.

The OpenRouter API call is made only from the backend using the `OPENROUTER_API_KEY` environment variable. The frontend never directly accesses the AI API or API key.

## What I Intentionally Excluded

- **User accounts:** GitFix does not require accounts because the core purpose is to explain Git errors immediately. Adding authentication would add complexity without being necessary for the main feature.

- **Error history/database:** GitFix does not save previous errors or explanations. The tool is designed for quick, one-time troubleshooting, so persistent storage was not necessary for the first version.

- **Automatic Git repository access:** GitFix does not connect directly to a user's local Git repository. Users paste the error themselves, keeping the application simple and avoiding the need for filesystem or repository permissions.

## Monthly Cost Calculation

**Model:** `openai/gpt-4o-mini`

**Input token rate:** `$0.15 per 1M tokens`

**Output token rate:** `$0.60 per 1M tokens`

**Average tokens per call:** `~600 input + ~400 output`

**Input cost per call:**

`600 / 1,000,000 × $0.15 = $0.000090`

**Output cost per call:**

`400 / 1,000,000 × $0.60 = $0.000240`

**Cost per call:**

`$0.000090 + $0.000240 = $0.000330`

**Expected monthly calls:** `300`

**Monthly total:**

`300 × $0.000330 = $0.099`

**Estimated monthly AI cost: ~$0.10/month**

This calculation represents the estimated AI API usage. Hosting is deployed using Render's free tier.

## Live Deployment

**Frontend:** `https://gitfix-frontend.onrender.com`

**Backend:** `https://gitfix-27m2.onrender.com`

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express
- OpenRouter API
- `openai/gpt-4o-mini`
- Render
- GitHub

## Features

- Paste Git errors into the interface
- AI-powered Git error explanations
- Beginner-friendly troubleshooting steps
- Structured explanations
- Warning for potentially risky Git commands
- Loading state while the AI response is generated
- Error handling when the backend is unavailable
- Live frontend and backend deployment