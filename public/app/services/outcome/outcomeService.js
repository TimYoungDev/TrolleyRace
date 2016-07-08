trolleyApp.service('outcomeService', ['$http', 
    function ($http) {
        
        var getOutcomesForYear = function (year) {
            return [
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
        };
        
        var updateOutcome = function (outcomeInfo) {
            
        };
        
        return {
            getOutcomesForYear: getOutcomesForYear
        }
    }
]);
