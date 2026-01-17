// ================================
// GLOBAL CONFIGURATION
// ================================

// IMPORTANT: MUST point to /submit-result
const API_BASE_URL = "https://7qpx0plfwg.execute-api.us-west-1.amazonaws.com/dev";

// API endpoints
const API_ENDPOINTS = {
  teacherSubmitResult: `${API_BASE_URL}/submit-result`
};

// Export globally
window.APP_CONFIG = {
  API_BASE_URL,
  API_ENDPOINTS
};
