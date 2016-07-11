var trolleyRaceDb = require("../app.services/database/trolleyRaceDb")();

describe("Trolley Race Database", function () {
    describe("Get Email List", function () {
        // it("adds a list of email addresses", function () {
        //     trolleyRaceDb.seedTestData();
        // });

        it("list is equal to 2", function () {
            trolleyRaceDb.getEmailList(function (list) {
                expect(list.length).toBe(2);
            }, function (error) {});
        });
        
        it ("first address is Tim@stuff.com", function () {
            trolleyRaceDb.getEmailList(function (list) {
                expect(list[0].email).toBe("Tim@stuff.com");
            })
        });
    });
});

