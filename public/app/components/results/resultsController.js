trolleyApp.controller('resultsController', ['$scope', '$routeParams', 'outcomeService',
    function ($scope, $routeParams, outcomeService) {
        $scope.year = $routeParams.year;
        $scope.outcomes = [];

        outcomeService.getOutcomes(function (response) {
            if (!response.hasError) {
                $scope.outcomes = response.data;
            }
        });
    }
]);
