var trolleyRaceDb = require("../app.services/database/trolleyRaceDb")();

describe("Trolley Race Database", function () {
    describe("Get Email List", function () {
        // it("adds a list of email addresses", function () {
        //     trolleyRaceDb.seedTestData();
        // });

        it("list is not null", function () {
            trolleyRaceDb.getOutcomeList(function (error, list) {
                expect(list).toEqual(!null);
            });
        });
        
    });
});

