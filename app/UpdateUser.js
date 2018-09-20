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
//currently not working
exports.updateUser = function (req, res) {
    let attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: req.body.name
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "nickname",
        Value: req.body.nickname
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "gender",
        Value: req.body.gender
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "birthdate",
        Value: req.body.birthdate
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "picture",
        Value: req.body.picture
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: req.body.email
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "phone_number",
        Value: req.body.phone_number
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:university",
        Value: req.body.university
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:telegram",
        Value: req.body.telegram
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:religion",
        Value: req.body.religion
    }));


    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: req.user.email,
        Password: req.body.password
    });

    let userData = {
        Username: req.user.email,
        Pool: userPool
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            res.json('err')
        } else {
            res.json('result');
        }
    });
}