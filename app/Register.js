const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const Config = require('../config/config');
const poolData = {
    // Your user pool id here
    UserPoolId: Config.Cognito.user,
    // Your client id here
    ClientId: Config.Cognito.client
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
global.fetch = require("node-fetch");
const db = require('../models');

exports.RegisterUser = function (req, res) {
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

    userPool.signUp(req.body.email, req.body.password, attributeList, null, function (err, result) {
        if (err) {
            res.json(err);
            return;
        }
        cognitoUser = result.user;
        res.json('user name is ' + cognitoUser.getUsername());
    });
};