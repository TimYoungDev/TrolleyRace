"use strict";

var Controller = require("../../server/server.api/outcome/outcomeController");
var Result = require("../../server/server.services/trolleyRaceDbResult");
var Sinon = require("../../node_modules/sinon/lib/sinon");
var db = require("../../server/server.services/trolleyRaceDb");

describe("OutcomeController", () => {

    var dbMock, googMock, controller;
    beforeEach(() => {
        dbMock = Sinon.stub({getOutcomeList: (callback) => {}, updateOutcome: (outcome, callback) => {}});
        googMock = Sinon.stub({verifyToken: (token, callback) => {}});
        controller = new Controller(dbMock, googMock);
    });

    describe("GetOutcomeList", function () {

        it("Should show an error in the response", (done) => {
            dbMock.getOutcomeList.yields(new Result(true, "Error Message", null));

            controller.getOutcomeList(function (response) {
                expect(response.hasError).toBe(true);
                expect(response.message).toBe("Error Message");
                expect(response.data).toBeNull();
                done();
            });
        });

        it("Should return an array of outcomes", (done) => {
            let responseData = new Result(false, null, [
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
            dbMock.getOutcomeList.yields(responseData);
            controller.getOutcomeList(function (response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data.length).toBe(2);
                expect(response.data[0].winner).toBe("Tim");
                expect(response.data[1].winner).toBe("Trolley");
                done();
            });
        });
    });

    describe("UpdateOutcome", () => {

        function runAndVerify(outcome, expectedMessage, done) {
            controller.updateOutcome(outcome, (response) => {
                expect(response.hasError).toBe(true);
                expect(response.data).toBeNull();
                expect(response.message).toBe(expectedMessage);
                done();
            });
        }

        it("Should return missing token error", (done) => {
            let outcome = {alias: "abc", winner: "Tim", comments: "hello"};
            runAndVerify(outcome, "id_token cannot be undefined or null", done);
        });

        it("Should return alias too long error", (done) => {
            let outcome = {id_token: "abc123", alias: "abcdefghijklmnopqrstu", winner: "tim", comments: "hello"};
            runAndVerify(outcome, "alias is too long (20 max)", done);
        });

        it("Should return missing winner error", (done) => {
           let outcome = {id_token: "abc123", alias: "abcd", comments: "hello"};
           runAndVerify(outcome, "winner cannot be undefined", done);
        });

        it("Should return incorrect winner error", (done) => {
            let outcome = {id_token: "abc123", alias: "abcd", winner: "Blah", comments: "hello"};
            runAndVerify(outcome, "winner must be either tim or trolley", done);
        });

        it("Should return comments too long error", (done) => {
            let outcome = {id_token: "abc123", alias:"abcd", winner: "trolley",
                    comments: "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY" +
                              "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY" +
                              "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY" +
                              "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY" +
                              "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY" +
                              "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ"};
            runAndVerify(outcome, "comments is too long (300 max)", done);
        });

        it("Should return an invalid OAuth2 error", (done) => {
            let outcome = {id_token: "abc123", alias: "abcd", winner: "tim", comments: "hello"};
            googMock.verifyToken.callsArgWith(1, {isValid: false, email: "user@stuff.net", name: "user name"});
            runAndVerify(outcome, "Invalid OAuth2 token", done);
        });

        it("Should return a generic db error", (done) => {
            let outcome = {id_token: "abc123", alias: "abcd", winner: "tim", comments: "hello"};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: "user@stuff.net", name: "user name"});
            dbMock.updateOutcome.callsArgWith(1, {hasError: true, message: "Generic Error", data: null});
            runAndVerify(outcome, "Generic Error", done);
        });

        it("Should return a user not found error", (done) => {
            let outcome = {id_token: "abc123", alias: "abcd", winner: "tim", comments: "hello"};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: "user@stuff.net", name: "user name"});
            dbMock.updateOutcome.callsArgWith(1, {hasError: false, message: null, data: {result: {nModified: 0}}});
            runAndVerify(outcome, "The user was not found", done);
        });

        it("Should return a successful save", (done) => {
            let outcome = {id_token: "abc123", alias: "abcd", winner: "tim", comments: "hello"};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: "user@stuff.net", name: "user name"});
            dbMock.updateOutcome.callsArgWith(1, {hasError: false, message: null, data: {result: {nModified: 1}}});

            controller.updateOutcome(outcome, function (response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data.result.nModified).toBe(1);
                done();
            });
        });
    });
});
