 // js/auth.js
window.loginUser = async function(email, password) {
    const SDK = window.AmazonCognitoIdentity;
    const cfg = window.appConfig;

    if (!SDK) {
        throw new Error("AWS SDK failed to load. Please check your connection.");
    }

    const poolData = {
        UserPoolId: cfg.cognito.userPoolId,
        ClientId: cfg.cognito.clientId
    };
    
    const userPool = new SDK.CognitoUserPool(poolData);
    const authDetails = new SDK.AuthenticationDetails({
        Username: email,
        Password: password
    });
    
    const cognitoUser = new SDK.CognitoUser({
        Username: email,
        Pool: userPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().decodePayload();
                
                // Save tokens and info for the dashboards
                localStorage.setItem('userToken', result.getAccessToken().getJwtToken());
                localStorage.setItem('userDept', idToken['custom:department'] || "Computer Science");
                
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);
                
                resolve({ role: role });
            },
            onFailure: (err) => {
                reject(new Error(err.message || "Invalid credentials"));
            }
        });
    });
};
