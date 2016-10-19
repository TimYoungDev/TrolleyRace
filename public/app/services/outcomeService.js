trolleyApp.service('outcomeService', ['$http', '$location',
    function ($http, $location) {

        const host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
        function serviceResponse(hasError, message, data) {
            this.hasError = hasError;
            this.message = message;
            this.data = data;
        };

        var getOutcomes = function(responseHandler) {
            $http.get(host + '/api/outcome').then(function (response) {
                if (response.data.hasError) {
                    responseHandler(new serviceResponse(true, response.data.message, null));
                } else {
                    var i, completeOutcomes = [];
                    var list = response.data.data;
                    for (i=0;i<list.length;i+=1) {
                        if (list[i].hasOwnProperty('winner') &&
                            list[i].winner != null &&
                            list[i].winner.length > 0) {
                            completeOutcomes.push(list[i]);
                        }
                    }
                    responseHandler(new serviceResponse(false, null, completeOutcomes));
                }
            });
        };
        
        var updateOutcome = function (outcomeInfo, responseHandler) {
            $http.post(host + '/api/outcome', outcomeInfo).then(function (response) {
                if (response.data.hasError) {
                    responseHandler(new serviceResponse(true, response.data.message, null));
                } else {
                    responseHandler(new serviceResponse(false, null, null));
                }
            });
        };
        
        return {
            getOutcomes: getOutcomes,
            updateOutcome: updateOutcome
        }
    }
]);
