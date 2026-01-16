(function () {
  'use strict';

  const token = localStorage.getItem('idToken');
  if (!token) {
    window.location.href = 'signin.html';
    return;
  }

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'signin.html';
  });

  console.log('Teacher dashboard loaded');
})();

// ===============================
// FILE UPLOAD → API → LAMBDA
// ===============================

async function submitResults() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose a JSON file.");
    return;
  }

  try {
    // 1️⃣ Read file
    const text = await file.text();

    // 2️⃣ Parse JSON
    const data = JSON.parse(text);

    // 3️⃣ Send to API
    await uploadResults(data);

  } catch (err) {
    console.error("Invalid JSON file:", err);
    alert("Invalid JSON file.");
  }
}

async function uploadResults(data) {
  const token = localStorage.getItem("idToken");

  try {
    const response = await fetch(
      "https://evqtbna09d.execute-api.us-west-1.amazonaws.com/prod/results",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Lambda error:", result);
      alert(result.message || "Upload failed");
      return;
    }

    console.log("Upload success:", result);
    alert("Results uploaded and saved to database!");

  } catch (error) {
    console.error("Network error:", error);
    alert("Network error.");
  }
}
