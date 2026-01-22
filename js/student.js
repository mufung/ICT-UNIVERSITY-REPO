import config from './config.js';

document.getElementById("studentResultForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentId").value.trim();
    const output = document.getElementById("resultsOutput");

    output.innerHTML = "Fetching Results...";

    try {
        const response = await fetch(`${config.api.baseUrl}/get-results?studentId=${studentId}`);
        const results = await response.json();

        if (results.length > 0) {
            output.innerHTML = results.map(r => `
                <div style="border:1px solid #14b8a6; padding:10px; margin:10px 0; background:#f0fdfa;">
                    <p><strong>Course:</strong> ${r.courseCode}</p>
                    <p><strong>Score:</strong> ${r.score}</p>
                    <p><strong>Semester:</strong> ${r.semester}</p>
                </div>
            `).join('');
        } else {
            output.innerHTML = "No results found for ID: " + studentId;
        }
    } catch (error) {
        output.innerHTML = "Error connecting to server.";
    }
});
