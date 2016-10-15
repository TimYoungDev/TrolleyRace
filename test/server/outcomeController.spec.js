var outcome = require('../../server/server.api/outcome/outcomeController');

var db = require('../../server/server.services/trolleyRaceDb')();

describe ('OutcomeController', function () {

    var dbMock = {
        getOutcomeList: function (handler) {
            handler(dbMock.responseData);
        },
        updateOutcome: function (outcome, handler) {
            handler(dbMock.responseData);
        },
        responseData: ''
    };
    var googMock = {
        verifyToken: function (token, handler) {
            handler(googMock.responseData);
        },
        responseData: ''
    };
    var controller = outcome(dbMock, googMock);

    describe('GetOutcomeList', function () {

        it('Should show an error in the response', function (done) {
            dbMock.responseData = new db.test.resultTemplate(true, 'Error Message', null);

            controller.getOutcomeList(function (response) {
                expect(response.hasError).toBe(true);
                expect(response.message).toBe('Error Message');
                expect(response.data).toBeNull();
                done();
            });
        });

        it('Should return an array of outcomes', function (done) {
            dbMock.responseData = new db.test.resultTemplate(false, null, [
                {
                    "email": "yt@gmail.com",
                    "name": "Tim",
                    "alias": "Ted",
                    "winner": "Tim",
                    "comments": "I am still awesome!"
                },
                {
                    "email": "sy@gmail.com",
                    "name": "SY",
                    "alias": "Wifey",
                    "winner": "Trolley",
                    "comments": "You are faster than me."
                }
            ]);

            controller.getOutcomeList(function (response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data.length).toBe(2);
                expect(response.data[0].winner).toBe('Tim');
                expect(response.data[1].winner).toBe('Trolley');
                done();
            });
        });
    });

    describe ('UpdateOutcome', function () {

        function runAndVerify(outcome, expectedMessage, done) {
            controller.updateOutcome(outcome, function (response) {
                expect(response.hasError).toBe(true);
                expect(response.data).toBeNull();
                expect(response.message).toBe(expectedMessage);
                done();
            });

        };

        it ('Should return missing token error', function (done) {
            var outcome = { alias: 'abc', winner: 'Tim', comments: 'hello' };
            runAndVerify(outcome, 'token_id cannot be undefined or null', done);
        });

        it ('Should return alias too long error', function (done) {
            var outcome = {token_id: 'abc123', alias: 'abcdefghijklmnopqrstu', winner:'tim', comments: 'hello'};
            runAndVerify(outcome, 'alias is too long (20 max)', done);
        });

        it ('Should return missing winner error', function (done) {
            var outcome = {token_id: 'abc123', alias: 'abcd', comments: 'hello'};
            runAndVerify(outcome, 'winner cannot be undefined', done);
        });

        it ('Should return incorrect winner error', function (done) {
           var outcome = { token_id: 'abc123', alias:'abcd', winner: 'Blah', comments: 'hello'};
            runAndVerify(outcome, 'winner must be either tim or trolley', done);
        });

        it ('Should return comments too long error', function (done) {
            var outcome = { token_id: 'abc123', alias:'abcd', winner: 'trolley',
                comments:   'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                            'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                            'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                            'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                            'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                            'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'};
            runAndVerify(outcome, 'comments is too long (300 max)', done);
        });

        it ('Should return an invalid OAuth2 error', function (done) {
            var outcome = { token_id: 'abc123', alias:'abcd', winner: 'tim', comments: 'hello'};
            googMock.responseData = { isValid: false, email: 'user@stuff.net', name: 'user name'};
            runAndVerify(outcome, 'Invalid OAuth2 token', done);
        });

        it ('Should return a generic db error', function (done) {
            var outcome = { token_id: 'abc123', alias:'abcd', winner: 'tim', comments: 'hello'};
            googMock.responseData = { isValid: true, email: 'user@stuff.net', name: 'user name'};
            dbMock.responseData = { hasError: true, message: 'Generic Error', data: null };
            runAndVerify(outcome, 'Generic Error', done);
        });

        it ('Should return a user not found error', function (done) {
            var outcome = { token_id: 'abc123', alias:'abcd', winner: 'tim', comments: 'hello'};
            googMock.responseData = { isValid: true, email: 'user@stuff.net', name: 'user name'};
            dbMock.responseData = { hasError: false, message: null, data: { result: { nModified: 0 }} };
            runAndVerify(outcome, 'The user was not found', done);
        });

        it ('Should return a successful save', function (done) {
            var outcome = { token_id: 'abc123', alias:'abcd', winner: 'tim', comments: 'hello'};
            googMock.responseData = { isValid: true, email: 'user@stuff.net', name: 'user name'};
            dbMock.responseData = { hasError: false, message: null, data: { result: { nModified: 1 }} };

            controller.updateOutcome(outcome, function (response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data.result.nModified).toBe(1);
                done();
            });
        });
    });
});
