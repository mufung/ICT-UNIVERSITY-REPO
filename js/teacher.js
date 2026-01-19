const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("resultFile");
const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {
  if (!fileInput.files.length) {
    status.innerText = "Please select a CSV file";
    return;
  }

  const file = fileInput.files[0];
  const text = await file.text();

  const response = await fetch(
    "https://YOUR_API_ID.execute-api.us-west-1.amazonaws.com/prod/teacher-upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/csv",
        "Authorization": localStorage.getItem("idToken")
      },
      body: text
    }
  );

  const data = await response.json();
  status.innerText = data.message || "Upload completed";
});
