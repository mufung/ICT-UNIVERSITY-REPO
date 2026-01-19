document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    studentId: document.getElementById("studentId").value,
    courseCode: document.getElementById("courseCode").value,
    semester: document.getElementById("semester").value,
    department: document.getElementById("department").value,
    score: Number(document.getElementById("score").value),
    grade: document.getElementById("grade").value
  };

  const res = await fetch(CONFIG.TEACHER_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message || "Uploaded");
});
