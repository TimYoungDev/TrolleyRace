"use strict";

var config = require("../config");
var https = require("https");

class GoogleOAuth {

    getTokenInfo(idToken, dataCallback, errorCallback) {
        let options = {
            host: config.googleAuth.host,
            path: config.googleAuth.path + idToken,
            method: "GET"
        };

        console.log(options);

        https.get(options, (response) => {
            let message = "";

            response.on("data", (data) => message += data);
            response.on("end", () => dataCallback(JSON.parse(message)) );
            response.on("error", (error) => errorCallback(error) );
        });
    }

    verifyToken(idToken, verifyCallback) {
        let returnData = { isValid: false, name: "", email: "" };

        this.getTokenInfo(idToken,
            (response) => {
                if (response.aud === config.googleAuth.appId) {
                    returnData.isValid = true;
                    returnData.name = response.name;
                    returnData.email = response.email;
                }
                verifyCallback(returnData);
            },
            () => verifyCallback(returnData) );
    }
}

module.exports = new GoogleOAuth;
