document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resultForm");

  if (!form) {
    console.error("resultForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      studentId: document.getElementById("studentId").value.trim(),
      courseCode: document.getElementById("courseCode").value.trim(),
      score: document.getElementById("score").value.trim(),
      semester: document.getElementById("semester").value.trim()
    };

    try {
      const response = await fetch(
        window.APP_CONFIG.SUBMIT_RESULT_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API ERROR:", data);
        alert("Failed to save result");
        return;
      }

      alert("✅ Result saved successfully");
      form.reset();

    } catch (error) {
      console.error("NETWORK ERROR:", error);
      alert("Network error");
    }
  });
});
