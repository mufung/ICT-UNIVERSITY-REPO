fetch("https://7qpx0plfwg.execute-api.us-west-1.amazonaws.com/dev/submit-result", {
  method: "POST", // REQUIRED
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    studentId: "ST001",
    courseCode: "CSC101",
    semester: "SEM1",
    department: "CS",
    score: 85,
    grade: "A"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
