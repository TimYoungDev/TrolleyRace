"use strict";

var outcomeController = function (trolleyRaceDb) {

    /**
     * Gets a list of all email addresses.
     * 
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)} 
     */
    var getEmailList = function (responseHandler) {
        trolleyRaceDb.getOutcomeList(function (error, result) {
            if (error) {
                responseHandler({hasError: true, message: error});
                return;
            }
            
            var i, addresses = [];
            for (i = 0; i < result.length; i += 1) {
                addresses.push(result[i].email.toLowerCase());
            }
            
            responseHandler({hasError: false, data: addresses});
        });
    };

    /**
     * Gets a list of all outcomes.
     *
     * @param responseHandler function (response)
     *  response: {hasError: (true|false), message: (error only), data: (success only)}
     */
    var getOutcomeList = function (responseHandler) {
        trolleyRaceDb.getOutcomeList(function (error, result) {
            if (error) {
                responseHandler({hasError: true, message: error});
                return;
            }
            
            responseHandler({hasError: false, data: result});
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
        if (outcome.name.length > 20) {
            responseHandler({hasError: true, message: 'name is too long (20 max)'});
            return;
        }
        
        if (outcome.comments.length > 300) {
            responseHandler({hasError: true, message: 'comments are too long (300 max)'});
            return;
        }

        outcome.email = outcome.email.toLowerCase();
        trolleyRaceDb.updateOutcome(outcome, function (error, result) {
            if (error) {
                responseHandler({hasError: true, message: error});
                return;
            }
            
            responseHandler({hasError: false, data: result});
        });
    };
        
    return {
        getEmailAddressList: getEmailList,
        getOutcomeList: getOutcomeList,
        updateOutcome: updateOutcome
    }
};

module.exports = outcomeController;