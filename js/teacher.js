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
            alert(`Success! Uploaded to ${department}.`);
        } else {
            alert("Upload Failed. Check your API authorization.");
        }
    } catch (err) {
        console.error("Network Error:", err);
    }
}

// File input listener
document.getElementById('fileInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const lines = event.target.result.split('\n').filter(l => l.trim() !== "");
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
    };
    reader.readAsText(file);
});
