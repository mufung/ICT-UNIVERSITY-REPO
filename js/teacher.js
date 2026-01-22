 import config from "./config.js";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    studentId: document.getElementById("studentId").value.trim(),
    courseCode: document.getElementById("courseCode").value.trim(),
    semester: document.getElementById("semester").value.trim(),
    score: Number(document.getElementById("score").value),
    grade: document.getElementById("grade").value.trim()
  };

  try {
    const response = await fetch(`${config.api.baseUrl}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Upload failed");
    }

    alert("✅ Result uploaded successfully");
    document.getElementById("uploadForm").reset();

  } catch (error) {
    console.error(error);
    alert("❌ Error uploading result");
  }
});
