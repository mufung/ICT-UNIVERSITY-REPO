function signIn() {
  const domain = "https://us-west-1zcpgrdab1.auth.us-west-1.amazoncognito.com";
  const clientId = "3537i7gssuj7dotmphqdkbu434";
  const redirectUri = "https://main.d3enyvo3amjsbz.amplifyapp.com/";

  const loginUrl =
    `https://${domain}.auth.us-west-1.amazoncognito.com/login` +
    `?response_type=token` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
}
