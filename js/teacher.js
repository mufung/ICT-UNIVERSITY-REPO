/*******************************
 * MANUAL RESULT SUBMISSION
 *******************************/
document.getElementById("resultForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    studentId: document.getElementById("studentId").value.trim(),
    courseCode: document.getElementById("courseCode").value.trim(),
    semester: document.getElementById("semester").value.trim(),
    score: Number(document.getElementById("score").value)
  };

  await submitResult(payload);
  document.getElementById("resultForm").reset();
});


/*******************************
 * CSV FILE UPLOAD
 *******************************/
document.getElementById("uploadCsvBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a CSV file first.");
    return;
  }

  const courseCode = document.getElementById("courseCode").value.trim();
  const semester = document.getElementById("semester").value.trim();

  if (!courseCode || !semester) {
    alert("Please enter Course Code and Semester before uploading CSV.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const lines = event.target.result.split("\n").slice(1);

    for (const line of lines) {
      if (!line.trim()) continue;

      const [studentId, score] = line.split(",");

      const payload = {
        studentId: studentId.trim(),
        courseCode,
        semester,
        score: Number(score)
      };

      await submitResult(payload);
    }

    alert("CSV results uploaded successfully.");
    fileInput.value = "";
  };

  reader.readAsText(file);
});


/*******************************
 * SHARED SUBMIT FUNCTION
 *******************************/
async function submitResult(payload) {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/submit-result`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Submission failed:", data);
      alert("Error submitting a result. Check console.");
    }

  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Check console.");
  }
}
