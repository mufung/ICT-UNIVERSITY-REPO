document
  .getElementById("studentResultForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const output = document.getElementById("resultsOutput");

    output.textContent = "Loading results...";

    try {
      const url =
        `${window.config.API_INVOKE_URL}` +
        `${window.config.ENDPOINTS.STUDENT_RESULTS}` +
        `?studentId=${encodeURIComponent(studentId)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (!response.ok) {
        output.textContent = data.error || "Failed to retrieve results.";
        return;
      }

      if (!data.results || data.results.length === 0) {
        output.textContent = "No results found.";
        return;
      }

      output.textContent = JSON.stringify(data, null, 2);

    } catch (err) {
      console.error(err);
      output.textContent = "Network error. Check console.";
    }
  });
