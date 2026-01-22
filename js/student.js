import config from './config.js';

document.getElementById("studentResultForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentId").value.trim();
    const output = document.getElementById("resultsOutput");

    output.innerHTML = "<em>Loading your records...</em>";

    try {
        const response = await fetch(`${config.api.baseUrl}/get-results?studentId=${studentId}`);
        const results = await response.json();

        if (results.length > 0) {
            output.innerHTML = results.map(r => `
                <div style="border: 2px solid #14b8a6; border-radius: 8px; padding: 15px; margin-bottom: 10px; background-color: #f0fdfa; color: #134e4a;">
                    <p><strong>Course:</strong> ${r.courseCode}</p>
                    <p><strong>Score:</strong> ${r.score}</p>
                    <p><strong>Semester:</strong> ${r.semester}</p>
                </div>
            `).join('');
        } else {
            output.innerHTML = `<p style="color: orange;">No results found for ID: ${studentId}</p>`;
        }
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Connection Error: Please check API Deployment.</p>`;
    }
});
