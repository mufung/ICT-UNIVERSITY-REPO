 import config from './config.js';

// Security Check: Redirect unauthorized users
if (localStorage.getItem('userRole') !== 'Teachers') {
  window.location.href = "signin.html";
}

// Manual Submission
document.getElementById("resultForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    studentId: document.getElementById("studentId").value.trim(),
    courseCode: document.getElementById("courseCode").value.trim(),
    score: Number(document.getElementById("score").value.trim()),
    semester: document.getElementById("semester").value.trim()
  };
  await sendToAPI(payload);
});

// Batch Upload Submission
document.getElementById("uploadBtn")?.addEventListener("click", () => {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("Please select a file.");

  const reader = new FileReader();
  reader.onload = async (e) => {
    const lines = e.target.result.split('\n').filter(l => l.trim());
    for (let line of lines) {
      const parts = line.split(',');
      const payload = {};
      parts.forEach(p => {
        const [k, v] = p.split(':').map(s => s.trim());
        payload[k] = k === 'score' ? Number(v) : v;
      });
      await sendToAPI(payload);
    }
    alert("Batch Processing Complete.");
  };
  reader.readAsText(file);
});

async function sendToAPI(payload) {
  const token = localStorage.getItem('userToken');
  const dept = localStorage.getItem('userDept');
  try {
    await fetch(`${config.api.baseUrl}/submit-result`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": token },
      body: JSON.stringify({ ...payload, department: dept })
    });
  } catch (err) { console.error("Upload failed", err); }
}
