function signIn() {
  const domain = "us-west-1mbnfq4dcv";
  const region = "us-west-1";
  const clientId = "7ugvqkg6l7859oto4v5vcjqjus";
  const redirectUri = "https://main.d3enyvo3amjsbz.amplifyapp.com/";

  const loginUrl =
    `https://${domain}.auth.${region}.amazoncognito.com/login` +
    `?response_type=token` +
    `&client_id=${clientId}` +
    `&scope=openid+email+profile` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
}
