"use strict";
var trolleyRaceDb = require('../../app.services/database/trolleyRaceDb')();

var outcomeController = function () {

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
                addresses.push(result[i].email);
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
     * Checks the database for an email address.  Returns the index of the email address or -1
     * if it wasn't found.
     * 
     * @param email The email address to check
     */
    var emailAddressIndex = function (email, response) {
        
        getEmailList(function (error, response) {
            if (response) {
                var i, index = -1, emailList = response.data;
                for (i = 0; i < emailList.length; i += 1) {
                    if (emailList[0] === email) {
                        index = i;
                        break;
                    }
                }
                response(index);
            }
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
        if (emailAddressIndex(outcome.email) === -1) {
            responseHandler({hasError: true, message: outcome.email + ' was not found.'});
            return;
        }
        
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