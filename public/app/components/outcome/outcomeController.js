"use strict";

trolleyApp.controller('outcomeController', ['$scope', '$location', 'outcomeService',
    function ($scope, $location, outcomeService) {
        $scope.errorText = null;
        $scope.betinfo = {};
        // $scope.betinfo = { // Seed for my sanity
        //     alias: "Timmy",
        //     winner: "Tim",
        //     comments: "Stuff",
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
            if (!isValid) {
                return;
            }

            outcomeService.updateOutcome($scope.betinfo, function (response) {
                if (response.hasError) {
                    $scope.errorText = response.message;
                } else {
                    $location.path('results/2016');
                }
            });
        };
    }
]);
