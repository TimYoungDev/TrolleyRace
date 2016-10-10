var https = require('https');

var googleOAuth = function () {

    // googleEndpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=XYZ123';
    var appId = '93527631113-ieg03tp98qn0m3nd8j4gurcd87thmenf.apps.googleusercontent.com';

    var getTokenInfo = function (idToken, dataCallback, errorCallback) {
        var options = {
            host: 'www.googleapis.com',
            path: '/oauth2/v3/tokeninfo?id_token=' + idToken,
            method: 'GET'
        };

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
            if (response.aud === appId) {
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
