import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentResultForm");
  const output = document.getElementById("resultsOutput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById("studentId").value.trim();
    output.innerHTML = "<em>Fetching records from Project-FX...</em>";

    try {
      // Step 3a: Call API Gateway with Query String
      const response = await fetch(`${config.api.baseUrl}/get-results?studentId=${studentId}`);
      
      if (!response.ok) {
        throw new Error("Failed to connect to result server.");
      }

      const results = await response.json();

      // Step 3b: Display results or "No Records Found"
      if (results.length > 0) {
        output.innerHTML = "<h4>Your Results:</h4>";
        results.forEach(record => {
          output.innerHTML += `
            <div style="background:#f9f9f9; padding:10px; border-left:5px solid #14b8a6; margin-bottom:10px;">
              <strong>Course:</strong> ${record.courseCode}<br>
              <strong>Score:</strong> ${record.score}<br>
              <strong>Semester:</strong> ${record.semester}
            </div>
          `;
        });
      } else {
        output.innerHTML = `<p style="color:red;">No records found for ID: ${studentId}</p>`;
      }

    } catch (err) {
      output.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  });
});
