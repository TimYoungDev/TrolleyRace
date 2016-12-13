"use strict";

var OutcomeResponse = require("../../server.services/trolleyRaceDbResult");

class OutcomeVerifyRule {

    constructor(message, verifyFunc) {
        this._message = message;
        this._verifyFunc = verifyFunc;
    }

    verify(outcome) {
        return this._verifyFunc(outcome);
    }

    get message() { return this._message; }
}

class OutcomeController {

    constructor(trolleyRaceDb, googleAuth) {
        this._trolleyRaceDb = trolleyRaceDb;
        this._googleAuth = googleAuth;
    }

    verifyOutcome(outcome) {

        let rules = [
            new OutcomeVerifyRule("id_token cannot be undefined or null",
                (obj) => { return obj.hasOwnProperty("id_token") && null != obj.id_token; } ),
            new OutcomeVerifyRule("alias is too long (20 max)",
                (obj) => { return obj.hasOwnProperty("alias") && obj.alias.length <= 20; } ),
            new OutcomeVerifyRule("winner cannot be undefined",
                (obj) => { return obj.hasOwnProperty("winner"); } ),
            new OutcomeVerifyRule("winner must be either tim or trolley",
                (obj) => { return obj.winner.toLowerCase() === "tim" || obj.winner.toLowerCase() === "trolley"; }),
            new OutcomeVerifyRule("comments is too long (300 max)",
                (obj) => { return obj.hasOwnProperty("comments") && obj.comments.length <= 300; })
        ];

        for (let rule of rules) {
            if (!rule.verify(outcome)) {
                return new OutcomeResponse(true, rule.message, null);
            }
        }

        return null;
    }

    /**
     * Gets a list of all outcomes.
     *
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)}
     */
    getOutcomeList(responseHandler) {
        this._trolleyRaceDb.getOutcomeList((dbResult) =>
            responseHandler(new OutcomeResponse(dbResult.hasError, dbResult.message, dbResult.data)) );
    }

    /**
     * Updates an outcome in the database.
     * @param outcome The outcome to update.
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)}
     */
    updateOutcome(outcome, responseHandler) {
        let verifyResult = this.verifyOutcome(outcome);
        if (null !== this.verifyOutcome(outcome)) {
            responseHandler(verifyResult);
            return;
        }

        this._googleAuth.verifyToken(outcome.id_token, (response) => {
            if (!response.isValid) {
                responseHandler(new OutcomeResponse(true, "Invalid OAuth2 token", null));
                return;
            }

            outcome.email = response.email.toLowerCase();
            outcome.name = response.name;
            this._trolleyRaceDb.updateOutcome(outcome, (dbResult) => {

                if (dbResult.hasError) {
                    responseHandler(new OutcomeResponse(true, dbResult.message, null));
                    return;
                }

                if (dbResult.data.result.nModified === 0) {
                    responseHandler(new OutcomeResponse(true, "The user was not found", null));
                    return;
                }

                responseHandler(new OutcomeResponse(false, null, dbResult.data));
            });
        });
    }
}

module.exports = OutcomeController;
