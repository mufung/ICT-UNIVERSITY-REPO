document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentResultForm");
  if (form) {
    form.addEventListener("submit", handleStudentSearch);
  }
});

async function handleStudentSearch(event) {
  event.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const semester = document.getElementById("semester").value.trim();

  if (!studentId) {
    alert("Student ID is required");
    return;
  }

  let query = `?studentId=${encodeURIComponent(studentId)}`;
  if (semester) {
    query += `&semester=${encodeURIComponent(semester)}`;
  }

  const url =
    window.config.API_INVOKE_URL +
    window.config.ENDPOINTS.STUDENT_RESULTS +
    query;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to load results");
      return;
    }

    displayResults(data.results);
  } catch (error) {
    console.error("Student fetch error:", error);
    alert("Network error");
  }
}

function displayResults(results) {
  const tbody = document.getElementById("resultsBody");
  const table = document.getElementById("resultsTable");

  tbody.innerHTML = "";

  if (!results || results.length === 0) {
    alert("No results found");
    table.style.display = "none";
    return;
  }

  results.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.courseCode}</td>
      <td>${item.score}</td>
      <td>${item.semester}</td>
      <td>${item.createdAt || "-"}</td>
    `;
    tbody.appendChild(row);
  });

  table.style.display = "table";
}
