document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resultForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      studentId: document.getElementById("studentId").value,
      courseCode: document.getElementById("courseCode").value,
      score: document.getElementById("score").value,
      semester: document.getElementById("semester").value
    };

    try {
      const res = await fetch(window.APP_CONFIG.API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save");
      }

      alert("✅ Result saved successfully");
      form.reset();

    } catch (err) {
      console.error(err);
      alert("❌ Failed to save result");
    }
  });
});
