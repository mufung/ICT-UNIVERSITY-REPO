 // js/auth.js - FIXED VERSION
async function loginUser(email, password) {
    // Check if Cognito library is loaded globally
    if (!window.AmazonCognitoIdentity || !window.AmazonCognitoIdentity.CognitoUserPool) {
        throw new Error("Cognito SDK not loaded. Check signin.html script tag.");
    }

    const { CognitoUserPool, CognitoUser, AuthenticationDetails } = window.AmazonCognitoIdentity;
    
    const poolData = {
        UserPoolId: "us-west-1_xxxxxxxxx", // Replace with your actual User Pool ID
        ClientId: "7ugvqkg6l7859oto4v5vcjqjus" // Your app client ID
    };
    
    const userPool = new CognitoUserPool(poolData);
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    });
    
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                // Get user tokens
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.getIdToken().decodePayload();
                
                // Store tokens
                localStorage.setItem('userToken', accessToken);
                localStorage.setItem('userEmail', email);
                
                // Get user groups from token
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);
                
                resolve({ role: role, email: email });
            },
            onFailure: (err) => {
                reject(new Error(err.message || "Login failed"));
            }
        });
    });
}

// Make function globally available
window.loginUser = loginUser;
