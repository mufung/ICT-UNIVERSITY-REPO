 /**
 * student.js
 * Student Result Viewer
 * Works with Amplify, Local PC, Lambda + API Gateway
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentResultForm");
  const resultContainer = document.getElementById("resultContainer");

  if (!form) {
    console.error("❌ studentResultForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const semester = document.getElementById("semester").value.trim();

    if (!studentId || !semester) {
      alert("Please fill all fields");
      return;
    }

    resultContainer.innerHTML = "Loading results...";

    try {
      const url =
        `${window.APP_CONFIG.API_BASE_URL}` +
        `?studentId=${encodeURIComponent(studentId)}` +
        `&semester=${encodeURIComponent(semester)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        resultContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      renderResults(data);

    } catch (error) {
      console.error("❌ Error fetching results:", error);
      resultContainer.innerHTML =
        "<p style='color:red;'>Failed to load results.</p>";
    }
  });

  function renderResults(results) {
    let html = `
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Score</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
    `;

    results.forEach(item => {
      html += `
        <tr>
          <td>${item.courseCode}</td>
          <td>${item.score}</td>
          <td>${item.semester}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    resultContainer.innerHTML = html;
  }
});
