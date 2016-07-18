trolleyApp.controller('betController', ['$scope', '$location', 'outcomeService',
    function ($scope, $location, outcomeService) {
        
        $scope.errorText = null;
        // $scope.betinfo = { // Seed for my sanity
        //     name: "Timmy",
        //     winner: "Tim",
        //     comments: "Stuff",
        //     email: "tim@stuff.com"
        // };

        $scope.submitForm = function (isValid) {
            if (!isValid) return;

            var successHandler = function () {

                $location.path('results/' + new Date().getFullYear());
            };
            var errorHandler = function (error) {
                $scope.errorText = error;
            };

            outcomeService.updateOutcome($scope.betinfo, successHandler, errorHandler);
        };
    }
]);
