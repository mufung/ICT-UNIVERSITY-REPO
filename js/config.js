 window.config = {
  // HTTP API INVOKE URL (base)
  API_BASE_URL: "https://7qpx0p1fwg.execute-api.us-west-1.amazonaws.com",

  // Stage
  API_STAGE: "dev",

  // FULL BASE (computed, safer)
  get API_INVOKE_URL() {
    return `${this.API_BASE_URL}/${this.API_STAGE}`;
  },

  // Endpoints
  ENDPOINTS: {
    TEACHER_RESULTS: "/teacher-results",
    STUDENT_RESULTS: "/student-results"
  }
};
