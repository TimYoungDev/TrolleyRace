"use strict";

var outcomeLib = require('../../server/server.api/outcome/outcomeController');
var db = require('../../server/server.services/trolleyRaceDb')();
var sinon = require('../../node_modules/sinon/lib/sinon');

describe('OutcomeController', function () {

    var dbMock, googMock, controller;
    beforeEach(function () {
        dbMock = sinon.stub({getOutcomeList: function (callback){}, updateOutcome: function (outcome, callback){}});
        googMock = sinon.stub({verifyToken: function (token, callback){}});
        controller = outcomeLib(dbMock, googMock);
    });

    describe('GetOutcomeList', function () {

        it('Should show an error in the response', function (done) {
            dbMock.getOutcomeList.yields(new db.test.resultTemplate(true, 'Error Message', null));

            controller.getOutcomeList(function (response) {
                expect(response.hasError).toBe(true);
                expect(response.message).toBe('Error Message');
                expect(response.data).toBeNull();
                done();
            });
        });

        it('Should return an array of outcomes', function (done) {
            var responseData = new db.test.resultTemplate(false, null, [
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
                expect(response.data[0].winner).toBe('Tim');
                expect(response.data[1].winner).toBe('Trolley');
                done();
            });
        });
    });

    describe('UpdateOutcome', function () {

        function runAndVerify(outcome, expectedMessage, done) {
            controller.updateOutcome(outcome, function (response) {
                expect(response.hasError).toBe(true);
                expect(response.data).toBeNull();
                expect(response.message).toBe(expectedMessage);
                done();
            });
        }

        it('Should return missing token error', function (done) {
            var outcome = {alias: 'abc', winner: 'Tim', comments: 'hello'};
            runAndVerify(outcome, 'id_token cannot be undefined or null', done);
        });

        it('Should return alias too long error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcdefghijklmnopqrstu', winner: 'tim', comments: 'hello'};
            runAndVerify(outcome, 'alias is too long (20 max)', done);
        });

        it('Should return missing winner error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', comments: 'hello'};
            runAndVerify(outcome, 'winner cannot be undefined', done);
        });

        it('Should return incorrect winner error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', winner: 'Blah', comments: 'hello'};
            runAndVerify(outcome, 'winner must be either tim or trolley', done);
        });

        it('Should return comments too long error', function (done) {
            var outcome = {id_token: 'abc123', alias:'abcd', winner: 'trolley',
                    comments: 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                              'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                              'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                              'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                              'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY' +
                              'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'};
            runAndVerify(outcome, 'comments is too long (300 max)', done);
        });

        it('Should return an invalid OAuth2 error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', winner: 'tim', comments: 'hello'};
            googMock.verifyToken.callsArgWith(1, {isValid: false, email: 'user@stuff.net', name: 'user name'});
            runAndVerify(outcome, 'Invalid OAuth2 token', done);
        });

        it('Should return a generic db error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', winner: 'tim', comments: 'hello'};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: 'user@stuff.net', name: 'user name'});
            dbMock.updateOutcome.callsArgWith(1, {hasError: true, message: 'Generic Error', data: null});
            runAndVerify(outcome, 'Generic Error', done);
        });

        it('Should return a user not found error', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', winner: 'tim', comments: 'hello'};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: 'user@stuff.net', name: 'user name'});
            dbMock.updateOutcome.callsArgWith(1, {hasError: false, message: null, data: {result: {nModified: 0}}});
            runAndVerify(outcome, 'The user was not found', done);
        });

        it('Should return a successful save', function (done) {
            var outcome = {id_token: 'abc123', alias: 'abcd', winner: 'tim', comments: 'hello'};
            googMock.verifyToken.callsArgWith(1, {isValid: true, email: 'user@stuff.net', name: 'user name'});
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
