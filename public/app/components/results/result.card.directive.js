"use strict";

trolleyApp.directive('resultCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/components/results/result.card.html',
        scope: {
            name: '@',
            winner: '@',
            comments: '@'
        }
    };
});
