trolleyApp.controller('resultsController', ['$scope', '$routeParams', 'outcomeService',
    function ($scope, $routeParams, outcomeService) {
        $scope.year = $routeParams.year;
        $scope.currentYear = new Date().getFullYear();

        var successHandler = function (data) {
            $scope.outcomes = data;
        };
        var errorHandler = function (error) {
            $scope.outcomes = [];
        };
        outcomeService.getOutcomesForYear($scope.year, successHandler, errorHandler);
    }
]);
