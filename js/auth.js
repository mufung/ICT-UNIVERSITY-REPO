 // ====== CONFIG (EDIT THESE) ======
const USER_POOL_ID = "us-west-1_xxxxx";
const CLIENT_ID = "xxxxxxxxxxxxxxxx";

// ====== LOGIN HANDLER ======
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = localStorage.getItem("loginRole");

  try {
    const result = await fetch(
      `https://cognito-idp.us-west-1.amazonaws.com/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
        },
        body: JSON.stringify({
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: CLIENT_ID,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password
          }
        })
      }
    );

    const data = await result.json();
    if (data.AuthenticationResult) {
      localStorage.setItem("token", data.AuthenticationResult.IdToken);

      if (role === "teacher") {
        window.location.href = "teacher-dashboard.html";
      } else {
        window.location.href = "student-dashboard.html";
      }
    } else {
      throw new Error("Invalid login");
    }

  } catch (err) {
    document.getElementById("error").innerText =
      "Login failed. Check credentials.";
  }
});
