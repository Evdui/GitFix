const explainBtn = document.getElementById("explainBtn");
const gitError = document.getElementById("gitError");
const result = document.getElementById("result");
const explanation = document.getElementById("explanation");
const errorMessage = document.getElementById("errorMessage");

const BACKEND_URL = "http://localhost:3000";

function formatExplanation(text) {
    const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return escaped
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/^- (.*)$/gm, "<li>$1</li>")
        .replace(/^\d+\. (.*)$/gm, "<li>$1</li>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
}

explainBtn.addEventListener("click", async () => {
    const error = gitError.value.trim();

    errorMessage.textContent = "";
    result.classList.add("hidden");

    if (!error) {
        errorMessage.textContent = "Please paste a Git error first.";
        return;
    }

    explainBtn.disabled = true;
    explainBtn.textContent = "Analyzing...";

    try {
        const response = await fetch(`${BACKEND_URL}/explain`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        explanation.innerHTML = formatExplanation(data.explanation);
        result.classList.remove("hidden");

    } catch (error) {
        errorMessage.textContent =
            "Could not connect to the backend. Make sure the server is running.";

    } finally {
        explainBtn.disabled = false;
        explainBtn.textContent = "Explain Error";
    }
});