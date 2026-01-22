 import config from './config.js';

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
                
                // Store Access Token for API calls, and metadata for UI
                localStorage.setItem('userToken', result.getAccessToken().getJwtToken());
                localStorage.setItem('userDept', idToken['custom:department'] || "Computer Science");
                
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);

                resolve({ role: role });
            },
            onFailure: (err) => reject(err)
        });
    });
}
