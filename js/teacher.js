import config from './config.js';

// --- Handle Manual Typing ---
document.getElementById("resultForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    studentId: document.getElementById("studentId").value.trim(),
    courseCode: document.getElementById("courseCode").value.trim(),
    score: Number(document.getElementById("score").value.trim()),
    semester: document.getElementById("semester").value.trim()
  };
  await sendToAPI(payload);
});

// --- Handle Multi-Student File Upload ---
document.getElementById("uploadBtn").addEventListener("click", () => {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("Please select your teacher.txt file first!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    const lines = e.target.result.split('\n');
    
    for (let line of lines) {
      if (line.trim() === "") continue;
      
      // Parsing the "key: value, key: value" format
      const parts = line.split(',');
      const payload = {};
      parts.forEach(part => {
        const [key, value] = part.split(':').map(s => s.trim());
        payload[key] = key === 'score' ? Number(value) : value;
      });

      await sendToAPI(payload);
    }
    alert("Batch Upload Finished! Check DynamoDB.");
  };
  reader.readAsText(file);
});

async function sendToAPI(payload) {
  try {
    const response = await fetch(`${config.api.baseUrl}/submit-result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log(`Uploaded ${payload.studentId}`);
  } catch (err) {
    console.error("Error uploading:", payload.studentId);
  }
}
