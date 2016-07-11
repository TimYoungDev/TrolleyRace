var app = require('../../app');
var mongoose = require('mongoose');

var trolleyRaceDb = function () {

    var Outcome = mongoose.model('Outcome', { name: String, winner: String, comments: String, email: String });

    var addTestData = function () {
        mongoose.connect(app.settings['db_url']);
        
        var outcome1 = new Outcome({name: '', winner: '', comments: '', email: 'Tim@stuff.com'});
        var outcome2 = new Outcome({name: '', winner: '', comments: '', email: 'Sela@stuff.com'})
        
        outcome1.save(function (err, outcomeObj) {
            if (err) {
                console.log(err);
            } else {
                console.log('Success: ', outcomeObj);
            }
        });

        outcome2.save(function (err, outcomeObj) {
            if (err) {
                console.log(err);
            } else {
                console.log('Success: ', outcomeObj);
            }
        });
        
        mongoose.close();
    };
    
    /**
     * Returns a list of email addresses currently in the Outcome table.
     * 
     * @param successCallback Success handler function
     * @param errorCallback Error handler function
     */
    var getEmailList = function (successCallback, errorCallback) {
        
        var db = mongoose.connect(app.settings['db_url']);
        
        Outcome.find({}, function (error, results) {
            if (error) {
                errorCallback(error);
            }

            successCallback(results);
        });
        db.disconnect();
    };
    
    /**
     * Finds an outcome by the email and updates the outcome
     * info.
     *
     * @param outcome The outcome to be updated
     */
    var updateOutcome = function (outcome) {
        
    };
    
    
    return {
        seedTestData: addTestData,
        getEmailList: getEmailList
    };
};

module.exports = trolleyRaceDb;
