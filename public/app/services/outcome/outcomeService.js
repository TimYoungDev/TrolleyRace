trolleyApp.service('outcomeService', ['$http', 
    function ($http) {
        
        var getOutcomesForYear = function (year, successHandler, errorHandler) {
            $http.get('http://localhost:3000/api/outcome').then(function (response) {
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
            $http.post('http://localhost:3000/api/outcome', outcomeInfo).then(function (response) {
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
