import config from './config.js';

export async function loginUser(email, password) {
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
                
                const department = payload['custom:department'] || "Computer Science";
                const role = payload['cognito:groups'] ? payload['cognito:groups'][0] : "Students";

                localStorage.setItem('userToken', idToken);
                localStorage.setItem('userDept', department);
                localStorage.setItem('userRole', role);

                resolve({ idToken, department, role });
            },
            onFailure: (err) => { reject(err); }
        });
    });
}
