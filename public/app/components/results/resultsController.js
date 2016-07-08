trolleyApp.controller('resultsController', ['$scope', 'outcomeService',
    function ($scope, outcomeService) {
        
        $scope.outcomes = outcomeService.getOutcomesForYear(2016);
    }
]);
