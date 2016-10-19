var config = require('../config');
var mongoClient = require('mongodb').MongoClient;

var trolleyRaceDb = function () {

    const outcomes_table = config.db.table;
    const db_connection_url = config.db.url + config.db.name;

    /**
     * Database callback result constructor.
     * @param hasError Error indicator
     * @param message Error message (if hasError is true)
     * @param data Result data if successful
     */
    function databaseResult(hasError, message, data) {
        this.hasError = hasError;
        this.message = message;
        this.data = data;
    };

    /**
     * Database storage object template.
     * @param email Email address
     * @param name Name
     * @param alias User alias
     * @param winner Race winner
     * @param comments User comments/jibes
     */
    function databaseObj(email, name, alias, winner, comments) {
        this.email = email;
        this.name = name;
        this.alias = alias;
        this.winner = winner;
        this.comments = comments;
    };

    function errorMessage(error) {
        var message = null;
        if (error) {
            message = error.toString();
        }
        return message;
    }
    /**
     * Returns a list of all outcomes currently in the Outcome table.
     * 
     * @param resultCallback Result handler function.
     */
    var getOutcomeList = function (resultCallback) {

        console.log('DB Service Url: ' + db_connection_url);
        mongoClient.connect(db_connection_url, function (error, db) {
            if (error) {
                console.log('DB Service Error: ' + error);
                resultCallback(new databaseResult(true, errorMessage(error), null));
            } else {
                var collection = db.collection(outcomes_table);
                collection.find({}).toArray(function (error, result) {
                    db.close();
                    resultCallback(new databaseResult((null != error), errorMessage(error), result));
                });
            }
        });
    };
    
    /**
     * Finds an outcome by the email and updates the outcome
     * info.
     *
     * @param outcome The outcome to be updated
     * @param resultCallback Result handler function.
     */
    var updateOutcome = function (outcome, resultCallback) {

        console.log('DB Service Url: ' + db_connection_url);
        mongoClient.connect(db_connection_url, function (error, db) {
            if (error) {
                console.log('DB Service Error: ' + error);
                resultCallback(new databaseResult(true, errorMessage(error), null));
            } else {
                var collection = db.collection(outcomes_table);
                collection.updateOne({email: outcome.email}, {$set: outcome}, function (error, updateResult) {
                    db.close();
                    resultCallback(new databaseResult((null != error), errorMessage(error), updateResult));
                });
            }
        });
    };

    return {
        getOutcomeList: getOutcomeList,
        updateOutcome: updateOutcome,
        test: { resultTemplate: databaseResult }
    };
};

module.exports = trolleyRaceDb;
