"use strict";

class MongoConfig {
    constructor() {
        this.db_name = "trolley_race";
        this.db_table = "outcomes";
        this.db_url = "mongodb://localhost:27017/";
    }
    get name() { return this.db_name; }
    get table() { return this.db_table; }
    get url() { return this.db_url; }
}

class GoogleAuthConfig {
    constructor() {
        this.auth_appId = "blah.apps.googleusercontent.com";
        this.auth_host = "www.googleapis.com";
        this.auth_path = "/oauth2/v3/tokeninfo?id_token=";
    }
    get appId() { return this.auth_appId; }
    get host() { return this.auth_host; }
    get path() {return this.auth_path; }
    get useAuth() { return false; } // enable/disable auth check
}

class Config {
    get db() { return new MongoConfig(); }
    get googleAuth() { return new GoogleAuthConfig(); }
}
module.exports = new Config();
