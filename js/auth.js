// ====== COGNITO CONFIG ======
const REGION = "us-west-1";
const CLIENT_ID = "7ugvqkg6l7859oto4v5vcjqjus";

// ====== LOGIN HANDLER ======
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = localStorage.getItem("loginRole");

  if (!role) {
    document.getElementById("error").innerText =
      "Please select Teacher or Student before signing in.";
    return;
  }

  try {
    const response = await fetch(
      `https://cognito-idp.${REGION}.amazonaws.com/`,
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

    const data = await response.json();

    if (!data.AuthenticationResult) {
      throw new Error("Authentication failed");
    }

    // ✅ STORE TOKEN WITH CORRECT KEY
    localStorage.setItem(
      "idToken",
      data.AuthenticationResult.IdToken
    );

    // ✅ REDIRECT BASED ON ROLE
    if (role === "teacher") {
      window.location.href = "teacher-dashboard.html";
    } else {
      window.location.href = "student-dashboard.html";
    }

  } catch (err) {
    document.getElementById("error").innerText =
      "Login failed. Please check your credentials.";
  }
});
