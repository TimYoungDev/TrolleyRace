trolleyApp.controller('betController', ['$scope', '$location', 'outcomeService',
    function ($scope, $location, outcomeService) {
        
        $scope.errorText = null;
        $scope.betinfo = { };
        // $scope.betinfo = { // Seed for my sanity
        //     name: "Tim Young",
        //     winner: "Tim",
        //     comments: "Stuff",
        //     email: "tim@stuff.com"
        // };

        $scope.options = {
            'onsuccess': function(user) {
                var profile = user.getBasicProfile();

                $scope.betinfo.name = profile.getName();
                $scope.betinfo.id_token = user.getAuthResponse().id_token;
                console.log($scope.betinfo.id_token);
                $scope.$digest(); // Force digest cycle to get name on form
            }
        };

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
