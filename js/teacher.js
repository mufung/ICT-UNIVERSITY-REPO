 // js/teacher.js
const config = window.appConfig;

// Verification Check
const userRole = localStorage.getItem('userRole');
if (userRole !== 'Teachers') {
    window.location.href = "signin.html";
}

document.getElementById("uploadBtn")?.addEventListener("click", () => {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return alert("Select teacher.txt first!");

    const reader = new FileReader();
    reader.onload = async (e) => {
        const lines = e.target.result.split('\n').filter(l => l.trim() !== "");
        for (let line of lines) {
            const parts = line.split(',');
            const payload = {};
            parts.forEach(part => {
                const [key, value] = part.split(':').map(s => s.trim());
                payload[key] = key === 'score' ? Number(value) : value;
            });
            await sendToAPI(payload);
        }
        alert("Batch Upload Finished!");
    };
    reader.readAsText(file);
});

async function sendToAPI(payload) {
    const token = localStorage.getItem('userToken');
    const dept = localStorage.getItem('userDept');

    try {
        await fetch(`${window.appConfig.api.baseUrl}/submit-result`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            body: JSON.stringify({ ...payload, department: dept })
        });
    } catch (err) {
        console.error("Upload error:", err);
    }
}
