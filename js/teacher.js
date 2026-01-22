import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resultForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Map HTML input values to the payload
    const payload = {
      studentId: document.getElementById("studentId").value.trim(),
      courseCode: document.getElementById("courseCode").value.trim(),
      score: Number(document.getElementById("score").value.trim()),
      semester: document.getElementById("semester").value.trim()
    };

    try {
      // Endpoint is /submit-result based on your API configuration
      const response = await fetch(`${config.api.baseUrl}/submit-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Result saved successfully to DynamoDB!");
        form.reset();
      } else {
        alert("Error: " + (data.error || "Submission failed"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please check your internet and API Gateway status.");
    }
  });
});
