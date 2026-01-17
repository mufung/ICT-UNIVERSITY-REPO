 const API_URL =
  "https://7qpx0plfwg.execute-api.us-west-1.amazonaws.com/dev/submit-result";

function uploadResults() {
  const fileInput = document.getElementById("fileInput");
  const statusDiv = document.getElementById("status");

  if (!fileInput.files.length) {
    statusDiv.innerText = "❌ Please select a CSV file";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: reader.result
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      statusDiv.innerText = "✅ Upload successful";
    } catch (err) {
      statusDiv.innerText = "❌ " + err.message;
    }
  };

  reader.readAsText(file);
}
