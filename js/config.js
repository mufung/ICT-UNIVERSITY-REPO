 const config = {
  cognito: {
    region: "us-west-1",
    userPoolId: "us-west-1_mbnfq4DcV",
    clientId: "7ugvqkg6l7859oto4v5vcjqjus" 
  },
  api: {
    baseUrl: "https://7qpx0plfwg.execute-api.us-west-1.amazonaws.com/dev"
  }
};
// Make it available globally for the non-module scripts
window.appConfig = config;
