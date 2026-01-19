document.getElementById("resultForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const courseCode = document.getElementById("courseCode").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const score = Number(document.getElementById("score").value);

  // Build payload EXACTLY how Lambda expects it
  const payload = {
    courseCode,
    semester,
    results: [
      {
        studentId,
        score
      }
    ]
  };

  try {
    const response = await fetch(
      `${config.API_BASE_URL}/submit-result`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Result submission failed");
      return;
    }

    alert("Result submitted successfully");
    document.getElementById("resultForm").reset();

  } catch (error) {
    console.error("Submission error:", error);
    alert("Network error. Check console.");
  }
});
