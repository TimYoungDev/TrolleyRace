trollyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/home/homeView.html',
                controller: 'homeController'
            })
            .when('/placebet', {
                templateUrl: 'app/components/bet/betView.html',
                controller: 'betController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

