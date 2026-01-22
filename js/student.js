 const studentId = document.getElementById("studentId").value;
const semester = document.getElementById("semester")?.value;

let url = `${window.config.STUDENT_RESULTS_API}?studentId=${studentId}`;

if (semester) {
  url += `&semester=${semester}`;
}

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("Student results:", data);
    // render results here
  })
  .catch(err => {
    console.error("Error loading results", err);
  });
