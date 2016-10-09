trolleyApp.directive('commonPanel', function () {
   return {
       restrict: 'E',
       templateUrl: 'app/components/shared/common.panel.html',
       transclude: true,
       scope: {
           headerText: '@header'
       },
       controller: function ($scope) {
           $scope.showHeader = false;

           if ($scope.headerText) {
               $scope.showHeader = true;
           }
       }
       // link: function (scope, element, attr) {
       //     scope.showHeader = false;
       //     scope.headerText = '';
       //
       //     if (attr['header']) {
       //         scope.showHeader = true;
       //         scope.headerText = attr['header'];
       //     }
       // }
   };
});
