"use strict";

var express = require('express');
var router = express.Router();
var TrolleyRaceDb = require('../../server.services/trolleyRaceDb');
var GoogleAuth = require('../../server.services/googleOAuth');
var OutcomeController = require('./outcomeController');

router.get('/', function (req, res) {
    let controller = new OutcomeController(new TrolleyRaceDb(), new GoogleAuth());
    controller.getOutcomeList(function (response) {
        res.send(response);
    });
});

router.post('/', function (req, res) {
    let controller = new OutcomeController(new TrolleyRaceDb(), new GoogleAuth());
    controller.updateOutcome(req.body, function (response) {
        res.send(response);
    });
});

module.exports = router;
