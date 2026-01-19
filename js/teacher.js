document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("resultFile");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.innerText = "❌ Please select a CSV file.";
    return;
  }

  const file = fileInput.files[0];

  if (!file.name.endsWith(".csv")) {
    status.innerText = "❌ Only CSV files are allowed.";
    return;
  }

  const reader = new FileReader();

  reader.onload = async (e) => {
    const text = e.target.result;
    const rows = text.trim().split("\n");

    // Remove header row
    rows.shift();

    const results = rows.map(row => {
      const [studentId, courseCode, score, semester] = row.split(",");

      return {
        studentId: studentId.trim(),
        courseCode: courseCode.trim(),
        score: Number(score.trim()),
        semester: semester.trim()
      };
    });

    try {
      const response = await fetch(`${config.API_BASE_URL}/submit-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results })
      });

      const data = await response.json();

      if (!response.ok) {
        status.innerText = "❌ Upload failed.";
        console.error(data);
        return;
      }

      status.innerText = "✅ Results uploaded successfully.";

    } catch (err) {
      console.error(err);
      status.innerText = "❌ Network or server error.";
    }
  };

  reader.readAsText(file);
});
