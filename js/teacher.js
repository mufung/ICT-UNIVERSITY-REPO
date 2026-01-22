import config from './config.js';

// Protect the page
if (localStorage.getItem('userRole') !== 'Teachers') {
    window.location.href = "signin.html";
}

document.getElementById("uploadBtn")?.addEventListener("click", () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert("Please select your teacher.txt file first!");

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
    await fetch(`${config.api.baseUrl}/submit-result`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": token 
      },
      body: JSON.stringify({ ...payload, department: dept })
    });
  } catch (err) {
    console.error("Upload failed for student:", payload.studentId);
  }
}
