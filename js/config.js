 window.config = {
  // === API CORE ===
  API_BASE_URL: "https://dx2imd746.execute-api.us-west-1.amazonaws.com",
  API_STAGE: "prod",

  // === AUTO-BUILT INVOKE URL ===
  get API_INVOKE_URL() {
    return `${this.API_BASE_URL}/${this.API_STAGE}`;
  },

  // === ENDPOINTS (DO NOT BREAK TEACHER) ===
  ENDPOINTS: {
    TEACHER_SUBMIT_RESULT: "/submit-result",
    STUDENT_RESULTS: "/student-results"
  }
};
