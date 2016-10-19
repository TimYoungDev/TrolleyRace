trolleyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/landing/landingView.html',
                controller: 'landingController'
            })
            .when('/placebet', {
                templateUrl: 'app/components/outcome/outcomeView.html',
                controller: 'outcomeController'
            })
            .when('/results/:year', {
                templateUrl: 'app/components/results/resultsView.html',
                controller: 'resultsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

