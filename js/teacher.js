 // ===============================
// TEACHER DASHBOARD JS (ONLY)
// ===============================

// REST API Invoke URL (teacher)
const API_BASE_URL = "https://7qpx0p1fwg.execute-api.us-west-1.amazonaws.com/dev";

// Endpoint used by teacher Lambda
const RESULTS_ENDPOINT = "/results";

// Handle form submit
document.getElementById("teacherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const courseCode = document.getElementById("courseCode").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const department = document.getElementById("department").value.trim();
  const score = document.getElementById("score").value.trim();
  const grade = document.getElementById("grade").value.trim();

  if (
    !studentId ||
    !courseCode ||
    !semester ||
    !department ||
    !score ||
    !grade
  ) {
    alert("All fields are required");
    return;
  }

  const payload = {
    studentId,
    courseCode,
    semester,
    department,
    score,
    grade
  };

  try {
    const response = await fetch(API_BASE_URL + RESULTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("API Error:", result);
      alert("Upload failed. Check Lambda logs.");
      return;
    }

    console.log("Success:", result);
    alert("Result uploaded successfully!");

    // Optional: reset form
    document.getElementById("teacherForm").reset();

  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Check API Gateway or CORS.");
  }
});
