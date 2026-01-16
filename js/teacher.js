// js/teacher.js

(function () {
    'use strict';

    if (!window.localStorage.getItem('idToken')) {
        window.location.href = 'signin.html';
        return;
    }

    document.getElementById('logoutBtn')?.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'signin.html';
    });

    console.log('Teacher dashboard loaded');
})();

// ===============================
// API INTEGRATION – UPLOAD RESULTS
// ===============================

async function uploadResults(data) {
    const token = localStorage.getItem("idToken");

    if (!token) {
        alert("Session expired. Please sign in again.");
        window.location.href = "signin.html";
        return;
    }

    try {
        const response = await fetch(
            "https://evqtbna09d.execute-api.us-west-1.amazonaws.com/prod/results",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("API Error:", result);
            alert("Failed to upload results.");
            return;
        }

        console.log("Upload success:", result);
        alert("Results uploaded successfully!");

    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
    }
}
