// ================================
// TEACHER RESULT SUBMISSION LOGIC
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resultForm");

    if (!form) {
        console.error("❌ resultForm not found");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect values
        const studentId = document.getElementById("studentId").value.trim();
        const courseCode = document.getElementById("courseCode").value.trim();
        const score = document.getElementById("score").value.trim();
        const semester = document.getElementById("semester").value.trim();

        if (!studentId || !courseCode || !score || !semester) {
            alert("Please fill all fields");
            return;
        }

        const payload = {
            action: "submitResult",
            studentId,
            courseCode,
            score,
            semester,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch(
                window.APP_CONFIG.API_ENDPOINTS.teacherSubmitResult,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("❌ API Error:", data);
                alert("Failed to save result");
                return;
            }

            alert("✅ Result saved successfully");
            form.reset();

        } catch (err) {
            console.error("❌ Network error:", err);
            alert("Network error. Check console.");
        }
    });
});
