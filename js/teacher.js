import config from './config.js';

// 1. Function to handle the Bulk Upload
async function uploadResults(resultsArray) {
    const token = localStorage.getItem('userToken'); // Retrieve the Cognito Token
    
    if (!token) {
        alert("Session expired. Please log in again.");
        return;
    }

    try {
        const response = await fetch(`${config.api.baseUrl}/submit-result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // THE SECURITY TOKEN
            },
            body: JSON.stringify({
                results: resultsArray // Sending multiple students at once
            })
        });

        if (response.ok) {
            alert("Bulk Upload Successful!");
        } else {
            const error = await response.json();
            alert("Upload Failed: " + error.message);
        }
    } catch (err) {
        console.error("Network Error:", err);
    }
}

// 2. Logic to read the text file you created earlier
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split('\n');
        const results = lines.map(line => {
            // Logic to parse your teacher.txt format: "studentId: XXX, score: YYY..."
            const parts = line.split(',');
            return {
                studentId: parts[0].split(': ')[1],
                courseCode: parts[1].split(': ')[1],
                score: parts[2].split(': ')[1],
                semester: parts[3].split(': ')[1]
            };
        });
        
        uploadResults(results);
    };
    reader.readAsText(file);
});
