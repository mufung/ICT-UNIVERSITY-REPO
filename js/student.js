import config from './config.js';

document.getElementById("studentResultForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentId").value.trim();
    const output = document.getElementById("resultsOutput");
    
    // Retrieve the token saved during login
    const token = localStorage.getItem('userToken');

    if (!token) {
        output.innerHTML = "<p style='color:red;'>Please log in first.</p>";
        return;
    }

    output.innerHTML = "Verifying Identity & Fetching Results...";

    try {
        const response = await fetch(`${config.api.baseUrl}/get-results?studentId=${studentId}`, {
            method: 'GET',
            headers: {
                'Authorization': token, // PASSING THE PASSPORT
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error("Access Denied: Invalid Session.");
        }

        const results = await response.json();

        if (results.length > 0) {
            output.innerHTML = results.map(r => `
                <div style="border: 2px solid #14b8a6; padding: 15px; margin-bottom: 10px; background-color: #f0fdfa;">
                    <p><strong>Department:</strong> ${r.department}</p>
                    <p><strong>Course:</strong> ${r.courseCode}</p>
                    <p><strong>Score:</strong> ${r.score}</p>
                </div>
            `).join('');
        } else {
            output.innerHTML = "No results found in your department.";
        }
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});
