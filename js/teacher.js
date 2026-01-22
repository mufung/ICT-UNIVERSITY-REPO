 import config from './config.js';

// YOUR ORIGINAL MANUAL ENTRY LOGIC
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

// YOUR ORIGINAL BATCH UPLOAD LOGIC
document.getElementById("uploadBtn").addEventListener("click", () => {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("Please select your teacher.txt file first!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    const lines = e.target.result.split('\n');
    
    for (let line of lines) {
      if (line.trim() === "") continue;
      
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

// ENHANCED SEND FUNCTION (Added Authorization)
async function sendToAPI(payload) {
  const token = localStorage.getItem('userToken'); // Added security token
  const dept = localStorage.getItem('userDept');   // Added department
  
  try {
    const response = await fetch(`${config.api.baseUrl}/submit-result`, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Authorization": token // The glue connecting login to API
      },
      body: JSON.stringify({
          ...payload,
          department: dept // Automatically tag with Computer Science
      })
    });
    console.log(`Uploaded ${payload.studentId}`);
  } catch (err) {
    console.error("Error uploading:", payload.studentId);
  }
}
