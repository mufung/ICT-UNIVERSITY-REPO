document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.textContent = "❌ Please select a CSV file";
    return;
  }

  const file = fileInput.files[0];
  status.textContent = "Reading file...";

  try {
    const text = await file.text();
    const rows = text.trim().split("\n");

    const headers = rows[0].split(",");
    const data = rows.slice(1).map(row => {
      const values = row.split(",");
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i].trim();
      });
      return obj;
    });

    status.textContent = "Uploading results...";

    const response = await fetch(
      window.APP_CONFIG.API_ENDPOINTS.teacherSubmitResult,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulkUpload",
          records: data
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Upload failed");
    }

    status.textContent = `✅ Uploaded ${data.length} results successfully`;

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Upload failed (check console)";
  }
});
