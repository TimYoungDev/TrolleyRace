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
                    db.close();
                    if (error) {
                        resultCallback(error, null);
                    } else {
                        resultCallback(null, results);
                    }
                });
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
                collection.update({email: outcome.email}, {$set: outcome}, function (error, updateResult) {
                    db.close();
                    if (error) {
                        resultCallback(error, null);
                    } else if (updateResult.result.nModified === 0) {
                        resultCallback("Email " + outcome.email + " was not found", null);
                    } else {
                        resultCallback(null, updateResult);
                    }
                });
            }
        });
    };
    
    
    return {
        getOutcomeList: getOutcomeList,
        updateOutcome: updateOutcome
    };
};

module.exports = trolleyRaceDb;
