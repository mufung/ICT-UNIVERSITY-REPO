 // teacher.js
import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resultForm");

  if (!form) {
    console.error("Form not found! Check HTML.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      studentId: document.getElementById("studentId").value.trim(),
      courseCode: document.getElementById("courseCode").value.trim(),
      score: Number(document.getElementById("score").value.trim()),
      semester: document.getElementById("semester").value.trim()
    };

    try {
      const response = await fetch(`${config.api.baseUrl}/submit-result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Submission failed");
        return;
      }

      alert("Result submitted successfully");
      form.reset();

    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Check console.");
    }
  });
});
