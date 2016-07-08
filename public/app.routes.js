trolleyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/landing/landingView.html',
                controller: 'landingController'
            })
            .when('/placebet', {
                templateUrl: 'app/components/bet/betView.html',
                controller: 'betController'
            })
            .when('/results', {
                templateUrl: 'app/components/results/resultsView.html',
                controller: 'resultsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

