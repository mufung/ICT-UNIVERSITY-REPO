 import config from './config.js';

// Explicitly grab the library from the window object
const AmazonCognitoIdentity = window.AmazonCognitoIdentity;

export async function loginUser(email, password) {
    const poolData = { UserPoolId: config.cognito.userPoolId, ClientId: config.cognito.clientId };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password });
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().decodePayload();
                
                // FIX: Use Access Token for API Authorization, ID Token for Profile info
                localStorage.setItem('userToken', result.getAccessToken().getJwtToken());
                localStorage.setItem('userDept', idToken['custom:department'] || "Computer Science");
                
                // Role handling
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);

                resolve({ role: role });
            },
            onFailure: (err) => reject(err)
        });
    });
}
