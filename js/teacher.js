import config from './config.js';

async function uploadResults(resultsArray) {
    const token = localStorage.getItem('userToken');
    const department = localStorage.getItem('userDept');

    if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = 'signin.html'; 
        return;
    }

    try {
        const response = await fetch(`${config.api.baseUrl}/submit-result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({
                department: department, 
                results: resultsArray 
            })
        });

        if (response.ok) {
            alert(`Bulk Upload Successful! ${resultsArray.length} records added to ${department}.`);
        } else {
            const error = await response.json();
            alert("Upload Failed: " + (error.message || "Unauthorized"));
        }
    } catch (err) {
        console.error("Upload Error:", err);
        alert("Network Error. Check your connection.");
    }
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split('\n').filter(l => l.trim() !== "");
        
        try {
            const results = lines.map(line => {
                const parts = line.split(',');
                return {
                    studentId: parts[0].split(': ')[1].trim(),
                    courseCode: parts[1].split(': ')[1].trim(),
                    score: parts[2].split(': ')[1].trim(),
                    semester: parts[3].split(': ')[1].trim()
                };
            });
            uploadResults(results);
        } catch (err) {
            alert("File Format Error. Use: studentId: X, courseCode: Y, score: Z, semester: S");
        }
    };
    reader.readAsText(file);
});
