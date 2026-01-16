function login(role) {
  localStorage.setItem("selectedRole", role);

  const url =
    `${COGNITO_CONFIG.domain}/login` +
    `?client_id=${COGNITO_CONFIG.clientId}` +
    `&response_type=${COGNITO_CONFIG.responseType}` +
    `&scope=${encodeURIComponent(COGNITO_CONFIG.scopes)}` +
    `&redirect_uri=${encodeURIComponent(COGNITO_CONFIG.redirectUri)}`;

  window.location.href = url;
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
