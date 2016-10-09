trolleyApp.controller('resultsController', ['$scope', '$routeParams', 'outcomeService',
    function ($scope, $routeParams, outcomeService) {
        $scope.year = $routeParams.year;
        $scope.currentYear = new Date().getFullYear();

        var successHandler = function (data) {
            //$scope.outcomes = data;
            $scope.outcomes = [
                {
                    name: "My Super-long name goes here",
                    winner: "Trolley",
                    comments: "AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstu vwxyzAbcdefgAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz"
                }
            ];
        };
        var errorHandler = function (error) {
            $scope.outcomes = [
                {
                    name: "My Super-long name goes here",
                    winner: "Trolley",
                    comments: "AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz"
                }

            ];
        };
        outcomeService.getOutcomesForYear($scope.year, successHandler, errorHandler);
    }
]);
