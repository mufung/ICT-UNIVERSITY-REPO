 // js/teacher.js
(function() {
    // Basic Security: Send back to login if the role isn't Teachers
    if (localStorage.getItem('userRole') !== 'Teachers') {
        window.location.href = "signin.html";
    }

    const uploadBtn = document.getElementById("uploadBtn");
    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            const file = document.getElementById('fileInput').files[0];
            if (!file) return alert("Please select the teacher.txt file!");

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
    }

    async function sendToAPI(payload) {
        const token = localStorage.getItem('userToken');
        const dept = localStorage.getItem('userDept');
        const baseUrl = window.appConfig.api.baseUrl;

        try {
            await fetch(`${baseUrl}/submit-result`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token 
                },
                body: JSON.stringify({ ...payload, department: dept })
            });
        } catch (err) {
            console.error("Failed to upload student: " + payload.studentId, err);
        }
    }
})();
