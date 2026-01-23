 // THIS FILE NOW CONTAINS THE CONFIG AND THE LOGIN LOGIC
const poolData = {
    UserPoolId: "us-west-1_mbnfq4DcV",
    ClientId: "7ugvqkg6l7859oto4v5vcjqjus" 
};

function handleLogin(email, password, messageElement, buttonElement) {
    // 1. Check if the SDK is loaded from the HTML script tag
    if (typeof AmazonCognitoIdentity === 'undefined') {
        messageElement.innerText = "Security Library blocked. Please use Incognito Mode.";
        messageElement.style.display = "block";
        buttonElement.disabled = false;
        buttonElement.innerText = "Sign In";
        return;
    }

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
    });
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
    });

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
            const token = result.getAccessToken().getJwtToken();
            localStorage.setItem('userToken', token);
            // Redirect based on the URL or a specific page
            window.location.href = "dashboard_teacher.html";
        },
        onFailure: (err) => {
            messageElement.innerText = err.message || "Invalid Email or Password";
            messageElement.style.display = "block";
            buttonElement.disabled = false;
            buttonElement.innerText = "Sign In";
        }
    });
}
