"use strict";

var outcomeController = function (trolleyRaceDb, googleAuth) {

    function outcomeResponse(hasError, message, data) {
        this.hasError = hasError;
        this.message = message;
        this.data = data;
    };

    function verifyOutcome(outcome) {

        // id_token
        if (!outcome.hasOwnProperty('id_token') || null == outcome.id_token) {
            return new outcomeResponse(true, 'id_token cannot be undefined or null', null);
        }

        // Alias if it exists
        if (outcome.hasOwnProperty('alias') && outcome.alias.length > 20) {
            return new outcomeResponse(true, 'alias is too long (20 max)', null);
        }

        // Winner
        if (!outcome.hasOwnProperty('winner')) {
            return new outcomeResponse(true, 'winner cannot be undefined', null);
        }
        if ( !(outcome.winner.toLowerCase() === 'tim' || outcome.winner.toLowerCase() === 'trolley')) {
            return new outcomeResponse(true, 'winner must be either tim or trolley', null);
        }

        // Comments if it exists
        if (outcome.hasOwnProperty('comments') && outcome.comments.length > 300) {
            return new outcomeResponse(true, 'comments is too long (300 max)', null);
        }

        return null;
    };

    /**
     * Gets a list of all outcomes.
     *
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)}
     */
    var getOutcomeList = function (responseHandler) {
        trolleyRaceDb.getOutcomeList(function (dbResult) {
            var response = new outcomeResponse(dbResult.hasError, dbResult.message, dbResult.data);
            responseHandler(response);
        });
    };

    /**
     * Updates an outcome in the database.
     * 
     * @param outcome The outcome to update.
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)}
     */
    var updateOutcome = function (outcome, responseHandler) {
        var verifyResult = verifyOutcome(outcome);
        if (null != verifyResult) {
            responseHandler(verifyResult);
            return;
        }

        googleAuth.verifyToken(outcome.id_token, function (response) {
            if (!response.isValid) {
                responseHandler(new outcomeResponse(true, 'Invalid OAuth2 token', null));
                return;
            }

            outcome.email = response.email.toLowerCase();
            outcome.name = response.name;
            trolleyRaceDb.updateOutcome(outcome, function (dbResult) {
                if (dbResult.hasError) {
                    responseHandler(new outcomeResponse(true, dbResult.message, null));
                    return;
                }

                if (dbResult.data.result.nModified === 0) {
                    responseHandler(new outcomeResponse(true, 'The user was not found', null));
                    return;
                }

                responseHandler(new outcomeResponse(false, null, dbResult.data));
            });
        });
    };
        
    return {
        getOutcomeList: getOutcomeList,
        updateOutcome: updateOutcome
    }
};

module.exports = outcomeController;
