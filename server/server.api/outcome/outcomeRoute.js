"use strict";

var express = require('express');
var router = express.Router();
var trolleyRaceDb = require('../../server.services/trolleyRaceDb')();
var googleAuth = require('../../server.services/googleOAuth')();
var outcomeController = require('./outcomeController')(trolleyRaceDb, googleAuth);

router.get('/', function (req, res) {
    outcomeController.getOutcomeList(function (response) {
        res.send(response);
    });
});

router.post('/', function (req, res) {
    outcomeController.updateOutcome(req.body, function (response) {
        res.send(response);
    });
});

module.exports = router;
