"use strict";

var config = {};

config.db = {
    name: 'trolley_race',
    table: 'outcomes',
    url: 'mongodb://localhost:27017/'
};

config.googleAuth = {
    appId: '93527631113-ieg03tp98qn0m3nd8j4gurcd87thmenf.apps.googleusercontent.com',
    host: 'www.googleapis.com',
    path: '/oauth2/v3/tokeninfo?id_token='
};

module.exports = config;
