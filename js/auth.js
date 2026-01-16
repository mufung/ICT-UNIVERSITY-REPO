  // ==============================
// CONFIG (AS YOU PROVIDED)
// ==============================
const USER_POOL_ID = "us-west-1_xxxxx";
const CLIENT_ID = "xxxxxxxxxxxxxxxx";

// ==============================
// ROLE SELECTION
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("studentLogin")?.addEventListener("click", () => {
    localStorage.setItem("loginRole", "student");
    window.location.href = "signin.html";
  });

  document.getElementById("teacherLogin")?.addEventListener("click", () => {
    localStorage.setItem("loginRole", "teacher");
    window.location.href = "signin.html";
  });
});

// ==============================
// LOGIN
// ==============================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = localStorage.getItem("loginRole");

  try {
    const res = await fetch("https://cognito-idp.us-west-1.amazonaws.com/", {
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
    });

    const data = await res.json();

    if (!data.AuthenticationResult) throw new Error();

    localStorage.setItem("idToken", data.AuthenticationResult.IdToken);

    window.location.href =
      role === "teacher"
        ? "teacher-dashboard.html"
        : "student-dashboard.html";

  } catch {
    document.getElementById("error").innerText =
      "Invalid login credentials.";
  }
});
