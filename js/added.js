function signIn() {
  const domain = "https://us-west-1mwmvk9jtt.auth.us-west-1.amazoncognito.com";
  const clientId = "2nvt55hgmp4dr3305drocl11dt";
  const redirectUri = "https://main.d3enyvo3amjsbz.amplifyapp.com/";

  const loginUrl =
    `https://${domain}.auth.us-west-1.amazoncognito.com/login` +
    `?response_type=token` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
}
