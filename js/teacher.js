 document.getElementById("resultForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    studentId: document.getElementById("studentId").value,
    courseCode: document.getElementById("courseCode").value,
    score: document.getElementById("score").value,
    semester: document.getElementById("semester").value
  };

  try {
    const response = await fetch(
      `${window.config.API_BASE_URL}/submit-result`,
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
      alert(data.error || "Submission failed");
      return;
    }

    alert("Result submitted successfully");
    document.getElementById("resultForm").reset();

  } catch (err) {
    console.error(err);
    alert("Network error. Check console.");
  }
});
