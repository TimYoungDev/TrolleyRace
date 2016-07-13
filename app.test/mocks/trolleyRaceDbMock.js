var trolleyRaceDbbMock = {
    callbackObj: {}
    ,outcomeObj: {}
    
    ,getOutcomeList: function (resultCallback) {
        resultCallback(this.callbackObj);
    }
    ,updateOutcome: function (outcome, resultCallback) {
        this.outcomeObj = outcome;
        resultCallback(this.callbackObj);
    }
};


