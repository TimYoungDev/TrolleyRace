"use strict";

trolleyApp.directive('commonHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/components/shared/common.header.html',
        transclude: true
    };
});
