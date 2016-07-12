trolleyApp.service('outcomeService', ['$http', 
    function ($http) {
        
        var getOutcomesForYear = function (year, successHandler, errorHandler) {
            $http.get('http://localhost:3000/api/outcome').then(function (response) {
                if (response.data.hasError) {
                    errorHandler(response.data.message);
                } else {
                    successHandler(response.data.data);
                }
            });
        };
        
        var updateOutcome = function (outcomeInfo, successHandler, errorHandler) {
            
        };
        
        return {
            getOutcomesForYear: getOutcomesForYear,
            updateOutcome: updateOutcome
        }
    }
]);
