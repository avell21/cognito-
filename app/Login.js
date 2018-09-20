const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const Config = require("../config/config");
const AWS = require('aws-sdk');
const poolData = {
    // Your user pool id here
    UserPoolId: Config.Cognito.user,
    // Your client id here
    ClientId: Config.Cognito.client
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
global.fetch = require("node-fetch");

exports.login = function (req, res) {
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: req.body.email,
        Password: req.body.password
    });
    let userData = {
        Username: req.body.email,
        Pool: userPool
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            let token = {
                accessToken: result.getAccessToken().getJwtToken(),
                idToken: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken()
            };
            let accessToken = result.getAccessToken().getJwtToken();
            let idToken = result.getIdToken().getJwtToken();
            let refreshToken = result.getRefreshToken().getToken();
            // cognitoUser['token'] = token
            res.json(token)
        },
        onFailure: function (err) {
            res.json(err);
        }
    });
};