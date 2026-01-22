 import config from './config.js';

export async function loginUser(email, password) {
    // FIX: Explicitly reference the library from the window object
    const CognitoSDK = window.AmazonCognitoIdentity;
    
    if (!CognitoSDK) {
        throw new Error("Cognito SDK not loaded. Please refresh the page.");
    }

    const poolData = { 
        UserPoolId: config.cognito.userPoolId, 
        ClientId: config.cognito.clientId 
    };
    
    const userPool = new CognitoSDK.CognitoUserPool(poolData);
    const authDetails = new CognitoSDK.AuthenticationDetails({ 
        Username: email, 
        Password: password 
    });
    const cognitoUser = new CognitoSDK.CognitoUser({ 
        Username: email, 
        Pool: userPool 
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken().decodePayload();
                
                // SAVE SESSION
                localStorage.setItem('userToken', result.getAccessToken().getJwtToken());
                localStorage.setItem('userDept', idToken['custom:department'] || "Computer Science");
                
                const groups = idToken['cognito:groups'] || [];
                const role = groups.includes('Teachers') ? 'Teachers' : 'Students';
                localStorage.setItem('userRole', role);

                resolve({ role: role });
            },
            onFailure: (err) => {
                reject(err);
            }
        });
    });
}
