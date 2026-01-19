document.getElementById("getResultsBtn").addEventListener("click", async () => {
  const studentId = document.getElementById("studentId").value;

  const res = await fetch(`${CONFIG.STUDENT_API_URL}?studentId=${studentId}`);
  const data = await res.json();

  const table = document.getElementById("resultsTable");
  table.innerHTML = `
    <tr>
      <th>Course</th>
      <th>Semester</th>
      <th>Score</th>
      <th>Grade</th>
    </tr>
  `;

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.courseCode}</td>
        <td>${item.semester}</td>
        <td>${item.score}</td>
        <td>${item.grade}</td>
      </tr>
    `;
  });
});
