 window.config = {
  API_BASE_URL: "https://7qpx0p1fwg.execute-api.us-west-1.amazonaws.com",
  API_STAGE: "prod",

  get API_INVOKE_URL() {
    return `${this.API_BASE_URL}/${this.API_STAGE}`;
  },

  ENDPOINTS: {
    TEACHER_RESULTS: "/teacher-results",
    STUDENT_RESULTS: "/student-results"
  }
};
