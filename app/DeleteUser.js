const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const Config = require("../config/config");
const poolData = {
    // Your user pool id here
    UserPoolId: Config.Cognito.user,
    // Your client id here
    ClientId: Config.Cognito.client
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
global.fetch = require("node-fetch");

exports.DeleteUser = function (req, res) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: req.user.email,
        Password: req.body.password
    });

    var userData = {
        Username: req.user.email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json("Successfully deleted the user.");
                    res.json(result);
                }
            });
        },
        onFailure: function (err) {
            res.json(err)
        },
    });
}