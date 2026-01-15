function signIn() {
  const domain = "YOUR_COGNITO_DOMAIN";
  const clientId = "YOUR_NEW_CLIENT_ID";
  const redirectUri = "https://main.d3enyvo3amjsbz.amplifyapp.com/";

  const loginUrl =
    `https://${domain}.auth.us-west-1.amazoncognito.com/login` +
    `?response_type=token` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
}