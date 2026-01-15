function signIn() {
  const domain = "us-west-1mmwvk9jtt";
  const region = "us-west-1";
  const clientId = "2nvt5hgnp4dr3305droc11dt";
  const redirectUri = "https://main.d3enyvo3amjsbz.amplifyapp.com/index.html";

  const loginUrl =
    `https://${domain}.auth.${region}.amazoncognito.com/login` +
    `?client_id=${clientId}` +
    `&response_type=token` +
    `&scope=openid+email+profile` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
}
