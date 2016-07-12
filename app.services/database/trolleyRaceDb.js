var app = require('../../app');
var mongoClient = require('mongodb').MongoClient;

var trolleyRaceDb = function () {

    const url = 'mongodb://localhost:27017/trolley_race';
    const outcomes_table = 'outcomes';
    /**
     * Returns a list of all outcomes currently in the Outcome table.
     * 
     * @param resultCallback Result handler function.  resultCallback(error, results)  
     */
    var getOutcomeList = function (resultCallback) {
        
        mongoClient.connect(url, function (error, db) {
            if (error) {
                resultCallback(error, null);
            } else {
                var collection = db.collection(outcomes_table);
                collection.find({}).toArray(function (error, results) {
                    if (error) {
                        resultCallback(error, null);
                    } else {
                        resultCallback(null, results);
                    }
                });
                db.close();
            }
        });
    };
    
    /**
     * Finds an outcome by the email and updates the outcome
     * info.
     *
     * @param outcome The outcome to be updated
     * @param resultCallback Result handler function.  resultCallback(error, results)
     */
    var updateOutcome = function (outcome, resultCallback) {
        
        mongoClient.connect(url, function (error, db) {
            if (error) {
                resultCallback(error, null);
            } else {
                var collection = db.collection(outcomes_table);
                collection.update({email: outcome.email}, {$set: outcome}, function (error, count) {
                    if (error) {
                        resultCallback(error, null);
                    } else {
                        resultCallback(null, count);
                    }
                });
                db.close();
            }
        });
    };
    
    
    return {
        getOutcomeList: getOutcomeList,
        updateOutcome: updateOutcome
    };
};

module.exports = trolleyRaceDb;
