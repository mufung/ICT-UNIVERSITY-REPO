 import config from './config.js';

// PROTECT THE PAGE: Redirect if not a teacher
const currentToken = localStorage.getItem('userToken');
const currentRole = localStorage.getItem('userRole');
if (!currentToken || currentRole !== 'Teachers') {
  window.location.href = "signin.html";
}

// Manual Entry Logic
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

// Batch Upload Logic (teacher.txt)
document.getElementById("uploadBtn")?.addEventListener("click", () => {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("Select teacher.txt first!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    const lines = e.target.result.split('\n').filter(l => l.trim() !== "");
    for (let line of lines) {
      const parts = line.split(',');
      const payload = {};
      parts.forEach(part => {
        const [key, value] = part.split(':').map(s => s.trim());
        payload[key] = key === 'score' ? Number(value) : value;
      });
      await sendToAPI(payload);
    }
    alert("Batch Upload Finished!");
  };
  reader.readAsText(file);
});

async function sendToAPI(payload) {
  const token = localStorage.getItem('userToken');
  const dept = localStorage.getItem('userDept');
  try {
    const response = await fetch(`${config.api.baseUrl}/submit-result`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": token 
      },
      body: JSON.stringify({ ...payload, department: dept })
    });
    if (response.ok) console.log("Uploaded successfully: ", payload.studentId);
  } catch (err) {
    console.error("API Error:", err);
  }
}
