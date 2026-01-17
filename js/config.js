// ================================
// GLOBAL CONFIGURATION
// ================================

// 🔴 IMPORTANT: This is your API Gateway Invoke URL
// MUST end with the stage name (e.g. /dev)
const API_BASE_URL = "https://7qpx0plfwg.execute-api.us-west-1.amazonaws.com/dev";

// API endpoints
const API_ENDPOINTS = {
    teacherSubmitResult: `${API_BASE_URL}`,
};

// Export for all JS files
window.APP_CONFIG = {
    API_BASE_URL,
    API_ENDPOINTS
};
