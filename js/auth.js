import config from './config.js';

export async function loginUser(email, password) {
    // FORCE the code to look at the global window for the library
    const Cognito = window.AmazonCognitoIdentity;

    if (!Cognito) {
        throw new Error("Cognito Library not found! Check your internet or signin.html script tag.");
    }

    const poolData = { 
        UserPoolId: config.cognito.userPoolId, 
        ClientId: config.cognito.clientId 
    };
    
    const userPool = new Cognito.CognitoUserPool(poolData);
    const authDetails = new Cognito.AuthenticationDetails({ Username: email, Password: password });
    const cognitoUser = new Cognito.CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().decodePayload();
                
                // Access Token for API, ID Token for User Data
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
