 import config from './config.js';

export async function loginUser(email, password) {
    const poolData = { UserPoolId: config.cognito.userPoolId, ClientId: config.cognito.clientId };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password });
    const user = new AmazonCognitoIdentity.CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const payload = result.getIdToken().decodePayload();
                // Store session data for teacher.js
                localStorage.setItem('userToken', result.getIdToken().getJwtToken());
                localStorage.setItem('userDept', payload['custom:department'] || "Computer Science");
                localStorage.setItem('userRole', payload['cognito:groups'] ? payload['cognito:groups'][0] : 'Students');
                resolve({ role: localStorage.getItem('userRole') });
            },
            onFailure: (err) => reject(err)
        });
    });
}
