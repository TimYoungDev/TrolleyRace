trolleyApp.service('outcomeService', ['$http', 
    function ($http) {
        
        var getOutcomesForYear = function (year, successHandler, errorHandler) {
            
            var data = [
                {
                    name: "Tom",
                    winner: "Trolley",
                    comments: "Will fall over"
                },
                {
                    name: "Dick",
                    winner: "Tim",
                    comments: "squirrel in power line."
                },
                {
                    name: "Harry",
                    winner: "Trolley",
                    comments: "Gawking at six pack abs"
                }
            ];
            
            successHandler(data);
        };
        
        var updateOutcome = function (outcomeInfo, successHandler, errorHandler) {
            errorHandler("Messed up!");
        };
        
        return {
            getOutcomesForYear: getOutcomesForYear,
            updateOutcome: updateOutcome
        }
    }
]);
