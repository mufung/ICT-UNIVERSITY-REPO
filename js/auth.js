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
                // Get the ID Token (contains custom attributes)
                const idToken = result.getIdToken().getJwtToken();
                const payload = result.getIdToken().decodePayload();
                
                // VERIFICATION: Extract Department
                const department = payload['custom:department'] || "No Department Set";
                const role = payload['cognito:groups'] ? payload['cognito:groups'][0] : "No Role";

                console.log("Login Success!");
                console.log("Verified Department:", department);
                console.log("User Role:", role);

                // Save to local storage for use in Teacher/Student pages
                localStorage.setItem('userToken', idToken);
                localStorage.setItem('userDept', department);
                localStorage.setItem('userRole', role);

                resolve({ idToken, department, role });
            },
            onFailure: (err) => {
                reject(err);
            }
        });
    });
}
