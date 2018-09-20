const jwt = require('jsonwebtoken');
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const Config = require("../config/config");
const request = require("request")
const jwktopem = require('jwk-to-pem');
const event = require('event');
global.fetch = require("node-fetch");

function ValidateToken(req, res, next, Authorization) {
    request({
        url: `https://cognito-idp.${Config.Cognito.region}.amazonaws.com/${Config.Cognito.user}/.well-known/jwks.json`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for (var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = {
                    kty: key_type,
                    n: modulus,
                    e: exponent
                };
                var pem = jwktopem(jwk);
                pems[key_id] = pem;
            }
            var decodedJwt = jwt.decode(req.headers.token, {
                complete: true
            });
            if (!decodedJwt) {
                res.json("Not a valid JWT token");
                return;
            }
            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid tokens');
                return;
            }
            jwt.verify(req.headers.token, pem, function (err, payload) {
                if (err) {
                    res.json("Invalid Token.");
                } else {
                    req.user = decodedJwt.payload;
                    next();
                }
            });

        } else {
            res.json("Error! there seems to be a problem with your connection");
        }
    });
}
module.exports = ValidateToken;