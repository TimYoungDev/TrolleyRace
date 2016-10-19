"use strict";

describe('OutcomeController', function () {

    var $controllerConstructor, scope, mockLocation, mockOutcomeService;

    beforeEach(module('trolleyApp'));
    beforeEach(inject(function ($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockLocation = sinon.stub({path: function (path){}});
        mockOutcomeService = sinon.stub({updateOutcome: function(outcome, callback){}});
    }));

    describe('SubmitForm', function () {

        it('Should set scope.errorText to an error message', function() {
            mockOutcomeService.updateOutcome.callsArgWith(1, {hasError: true, message: 'Generic Error Message', data: null});

            $controllerConstructor('outcomeController',
                    {'$scope': scope, '$location': mockLocation, outcomeService: mockOutcomeService});
            scope.submitForm(true);
            expect(scope.errorText).toBe('Generic Error Message');
        });

        it('Should set location service to results', function() {
            mockOutcomeService.updateOutcome.callsArgWith(1, {hasError: false, message: null, data: null});

            $controllerConstructor('outcomeController',
                    {'$scope': scope, '$location': mockLocation, outcomeService: mockOutcomeService});
            scope.submitForm(true);
            expect(mockLocation.path.calledWith('results/2016')).toBeTruthy();
        });
    });
});
