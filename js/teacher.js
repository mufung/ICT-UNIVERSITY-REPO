import { Auth } from "https://cdn.jsdelivr.net/npm/aws-amplify@5.3.8/dist/aws-amplify.min.js";
import awsconfig from "./config.js";

const API_URL = awsconfig.apiEndpoint;

// Make sure Amplify is configured
import { Amplify } from "https://cdn.jsdelivr.net/npm/aws-amplify@5.3.8/dist/aws-amplify.min.js";
Amplify.configure(awsconfig);

// Handle form submission
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");
  status.innerText = "Uploading...";

  try {
    // 🔐 GET REAL COGNITO TOKEN
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();

    // 📦 COLLECT FORM DATA
    const data = {
      studentId: document.getElementById("studentId").value,
      courseCode: document.getElementById("courseCode").value,
      academicYear: document.getElementById("academicYear").value,
      department: document.getElementById("department").value,
      results: document.getElementById("results").value
    };

    // 🚀 SEND TO API GATEWAY
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Upload failed");
    }

    status.innerText = "✅ Upload successful";

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    status.innerText = "❌ Upload failed (check console)";
  }
});
