 document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("resultFile");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.innerText = "Please select a CSV file";
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();
  const lines = text.trim().split("\n");

  // Assume CSV header:
  // studentId,courseCode,semester,department,score,grade
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const record = {};

    headers.forEach((h, index) => {
      record[h.trim()] = values[index].trim();
    });

    // Convert score to number
    record.score = Number(record.score);

    try {
      const response = await fetch(CONFIG.TEACHER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });

      const data = await response.json();
      console.log("Uploaded:", data);

    } catch (err) {
      console.error("Upload failed:", err);
      status.innerText = "Upload failed. Check console.";
      return;
    }
  }

  status.innerText = "All results uploaded successfully!";
});
