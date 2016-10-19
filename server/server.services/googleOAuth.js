"use strict";

var config = require('../config');
var https = require('https');

var googleOAuth = function () {

    var getTokenInfo = function (idToken, dataCallback, errorCallback) {
        var options = {};
        options.host = config.googleAuth.host;
        options.path = config.googleAuth.path + idToken;
        options.method = 'GET';

        console.log(options);

        var callback = function (response) {
            var message = '';

            response.on('data', function (data) {
                message += data;
            });

            response.on('end', function () {
                console.log(message);
                var objMessage = JSON.parse(message);
                dataCallback(objMessage);
            });

            response.on('error', function (error) {
                errorCallback(error);
            });
        };

        https.get(options, callback);
    };

    var verifyToken = function (idToken, verifyCallback) {
        var returnData = {
            isValid: false,
            name: '',
            email: ''
        };

        var successHandler = function (response) {
            if (response.aud === config.googleAuth.appId) {
                returnData.isValid = true;
                returnData.name = response.name;
                returnData.email = response.email;
            }

            verifyCallback(returnData);
        };

        var errorHandler = function () {
            verifyCallback(returnData);
        };

        getTokenInfo(idToken, successHandler, errorHandler);
    };

    return {
        verifyToken: verifyToken
    };
};

module.exports = googleOAuth;
