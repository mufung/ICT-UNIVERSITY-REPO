// js/teacher.js
import config from "./config.js";

const form = document.getElementById("resultForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const courseCode = document.getElementById("courseCode").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const score = Number(document.getElementById("score").value);

  if (!studentId || !courseCode || !semester || isNaN(score)) {
    message.textContent = "❌ All fields are required";
    return;
  }

  const payload = {
    studentId,
    courseCode,
    semester,
    score
  };

  try {
    const response = await fetch(`${config.api.baseUrl}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    message.textContent = "✅ Result uploaded successfully";
    form.reset();

  } catch (error) {
    console.error("Upload error:", error);
    message.textContent = "❌ Failed to upload result";
  }
});
