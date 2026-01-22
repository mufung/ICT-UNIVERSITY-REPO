 import config from './config.js';

document.getElementById("studentResultForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("studentId").value.trim();
    const out = document.getElementById("resultsOutput");
    out.innerHTML = "Fetching...";

    try {
        const res = await fetch(`${config.api.baseUrl}/get-results?studentId=${id}`);
        const data = await res.json();
        if (data.length > 0) {
            out.innerHTML = data.map(r => `
                <div style="border:1px solid #ddd; padding:10px; margin:5px 0;">
                    <strong>${r.courseCode}</strong>: ${r.score} (${r.semester})
                </div>`).join('');
        } else { out.innerHTML = "No results found."; }
    } catch (e) { out.innerHTML = "Connection error."; }
});
