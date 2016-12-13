"use strict";

var config = require("../config");
var mongoClient = require("mongodb").MongoClient;
var DatabaseResult = require("./trolleyRaceDbResult");

const outcomes_table = config.db.table;
const db_connection_url = config.db.url + config.db.name;

class TrolleyRaceDb {

    /*
     * Storage object format:
     * { email, name, alias, winner, comments }
     */

    errorMessage(error) {
        var message = null;
        if (error) {
            message = error.toString();
        }
        return message;
    }

    /**
     * Returns a list of all outcomes currently in the Outcome table.
     * @param resultCallback Result handler function.
     */
    getOutcomeList(resultCallback) {

        console.log("DB Service Url: " + db_connection_url);
        mongoClient.connect(db_connection_url, (error, db) => {
            if (error) {
                console.log("DB Service Error: " + error);
                resultCallback(new DatabaseResult(true, this.errorMessage(error), null));
            } else {
                db.collection(outcomes_table).find({}).toArray((error, result) => {
                    db.close();
                    resultCallback(new DatabaseResult((null !== error), this.errorMessage(error), result));
                });
            }
        });
    }
    /**
     * Finds an outcome by the email and updates the outcome
     * info.
     * @param outcome The outcome to be updated
     * @param resultCallback Result handler function.
     */
    updateOutcome(outcome, resultCallback) {

        console.log("DB Service Url: " + db_connection_url);
        mongoClient.connect(db_connection_url, (error, db) => {
            if (error) {
                console.log("DB Service Error: " + error);
                resultCallback(new DatabaseResult(true, this.errorMessage(error), null));
            } else {
                db.collection(outcomes_table)
                    .updateOne({email: outcome.email}, {"$set": outcome}, (error, updateResult) => {
                        db.close();
                        resultCallback(new DatabaseResult((null !== error), this.errorMessage(error), updateResult));
                    });
            }
        });
    }
}

module.exports = new TrolleyRaceDb;
