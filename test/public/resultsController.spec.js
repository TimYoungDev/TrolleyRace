
describe('ResultsController', function() {

    var $controllerConstructor, scope, routeParams, mockOutcomeService;

    beforeEach(module('trolleyApp'));
    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        routeParams = { year: '2016'};
        mockOutcomeService = sinon.stub({getOutcomes: function(callback) {} });
    }));

    it('Should set scope outcomes to an empty list', function () {
        mockOutcomeService.getOutcomes.yields({hasError: true, message: 'Error Message', data: null});

        $controllerConstructor('resultsController',
            {'$scope': scope, '$routeParams': routeParams, outcomeService:mockOutcomeService});
        expect(scope.year).toBe('2016');
        expect(scope.outcomes).toEqual([]);
    });

    it('Should set scope outcomes to a list of outcomes', function() {
        var mockOutcomes = [{alias: 'One'}, {alias: 'Two'}];
        mockOutcomeService.getOutcomes.yields({hasError: false, message: null, data: mockOutcomes});

        $controllerConstructor('resultsController',
            { '$scope': scope, '$routeParams': routeParams, outcomeService: mockOutcomeService})
        expect(scope.year).toBe('2016');
        expect(scope.outcomes).toEqual(mockOutcomes);
    });
});
