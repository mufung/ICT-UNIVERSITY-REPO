 // js/auth.js - NO MODULES, JUST GLOBAL FUNCTIONS
async function loginUser(email, password) {
    const Cognito = window.AmazonCognitoIdentity;
    const config = window.appConfig;

    if (!Cognito) {
        throw new Error("Cognito SDK missing. Check internet or script tag.");
    }

    const poolData = {
        UserPoolId: config.cognito.userPoolId,
        ClientId: config.cognito.clientId
    };
    
    const userPool = new Cognito.CognitoUserPool(poolData);
    const authDetails = new Cognito.AuthenticationDetails({
        Username: email,
        Password: password
    });
    
    const cognitoUser = new Cognito.CognitoUser({
        Username: email,
        Pool: userPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().decodePayload();
                
                // Save session for the teacher/student dashboards
                localStorage.setItem('userToken', result.getAccessToken().getJwtToken());
                localStorage.setItem('userDept', idToken['custom:department'] || "Computer Science");
                
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);
                
                resolve({ role: role });
            },
            onFailure: (err) => {
                reject(new Error(err.message || "Login failed"));
            }
        });
    });
}

// Attach to window so signin.html can see it
window.loginUser = loginUser;
