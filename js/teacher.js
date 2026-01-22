// js/teacher.js
(function() {
    // Security Guard
    if (localStorage.getItem('userRole') !== 'Teachers') {
        window.location.href = "signin.html";
    }

    const uploadBtn = document.getElementById("uploadBtn");
    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            const file = document.getElementById('fileInput').files[0];
            if (!file) return alert("Please select your teacher.txt file!");

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
                alert("Upload Complete!");
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
            console.error("Batch error for student " + payload.studentId, err);
        }
    }
})();
