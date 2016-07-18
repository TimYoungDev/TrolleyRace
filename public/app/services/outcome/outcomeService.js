trolleyApp.service('outcomeService', ['$http', '$location',
    function ($http, $location) {

        const host = $location.protocol() + '://' + $location.host() + ':' + $location.port();

        var getOutcomesForYear = function (year, successHandler, errorHandler) {
            $http.get(host + '/api/outcome').then(function (response) {
                if (response.data.hasError) {
                    errorHandler(response.data.message);
                } else {
                    var i, completeOutcomes = [];
                    for (i=0;i<response.data.data.length;i+=1) {
                        if (response.data.data[i].winner.length > 0) {
                            completeOutcomes.push(response.data.data[i]);
                        }
                    }
                    successHandler(completeOutcomes);
                }
            });
        };
        
        var updateOutcome = function (outcomeInfo, successHandler, errorHandler) {
            $http.post(host + '/api/outcome', outcomeInfo).then(function (response) {
                if (response.data.hasError) {
                    errorHandler(response.data.message);
                } else {
                    successHandler();
                }
            });
        };
        
        return {
            getOutcomesForYear: getOutcomesForYear,
            updateOutcome: updateOutcome
        }
    }
]);
