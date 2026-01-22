import config from './config.js';

export async function loginUser(email, password) {
    if (typeof AmazonCognitoIdentity === 'undefined') {
        throw new Error("Cognito SDK not loaded. Ensure the script is in your index/signin HTML.");
    }

    const userPoolData = {
        UserPoolId: config.cognito.userPoolId,
        ClientId: config.cognito.clientId
    };
    
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(userPoolData);
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
    });
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().getJwtToken();
                const payload = result.getIdToken().decodePayload();
                
                // Extract Department and Role from your Cognito settings
                const department = payload['custom:department'] || "Computer Science";
                const role = payload['cognito:groups'] ? payload['cognito:groups'][0] : "Students";

                // Save keys to the browser "fridge" (LocalStorage)
                localStorage.setItem('userToken', idToken);
                localStorage.setItem('userEmail', payload.email); 
                localStorage.setItem('userDept', department);
                localStorage.setItem('userRole', role);

                console.log("Verified Login for:", payload.email);
                resolve({ idToken, department, role });
            },
            onFailure: (err) => {
                console.error("Login Failed:", err);
                reject(err);
            }
        });
    });
}
