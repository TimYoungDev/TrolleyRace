
describe('OutcomeService', function () {

    var mockHttp;
    var mockLocation;

    beforeEach(module('trolleyApp'));

    beforeEach(function() {
        mockHttp = sinon.stub({ get: function(){}, post: function(){} });
        mockLocation = sinon.stub({protocol: function() { return 'http'; }, host: function() { return 'myhost'; }, port: function() { return '8080'; } });
        module(function($provide) {
            $provide.value('$http', mockHttp);
            $provide.value('$location', mockLocation);
        });

    });

    describe('GetOutcomes', function() {
        it('Should return an error response', inject(function(outcomeService) {
            mockHttp.get.returns({ then: function(callback) {
                callback({data: {hasError: true, message: 'error message', data: null}});
            }});

            outcomeService.getOutcomes(function (response) {
                //expect(mockHttp.get.calledWith('http://myhost:8080/api/outcome')).toBe(true);
                expect(response.hasError).toBe(true);
                expect(response.message).toBe('error message');
                expect(response.data).toBeNull();
            });
        }));

        it('Should return a list of outcome data', inject(function(outcomeService) {
            var returnData = {
                hasError: false,
                message: null,
                data: [
                    {email: 'one@test.com', name: 'John Doe', alias: 'Johnny', winner: 'Tim', comments: 'Super Cool'},
                    {email: 'two@test.com', name: 'Jane Doe', alias: 'Jane', winner: 'Trolley', comments: 'Just Cool'}
                ]
            };
            mockHttp.get.returns({then: function(callback) {
                callback({data: returnData});
            }});

            outcomeService.getOutcomes(function(response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data.length).toBe(2);
                expect(response.data[0]).toEqual(returnData.data[0]);
                expect(response.data[1]).toEqual(returnData.data[1]);});
        }));
    });

    describe('UpdateOutcome', function() {

        it('Should return an error response', inject(function(outcomeService) {
            var outcome = { token_id: '123xyz', email: 'one@test.com', winner:'Tim', comments: 'Blah'};
            mockHttp.post.returns({ then: function(callback) {
                callback({data: {hasError: true, message: 'error message', data: null}});
            }});

            outcomeService.updateOutcome(outcome, function(response) {
                expect(response.hasError).toBe(true);
                expect(response.message).toBe('error message');
                expect(response.data).toBeNull();
            });
        }));

        it('Should return a success response', inject(function(outcomeService) {
            var outcome = { token_id: '123xyz', email: 'one@test.com', winner:'Tim', comments: 'Blah'};
            mockHttp.post.returns({ then: function(callback) {
                callback({data: {hasError: false, message: null, data: null}});
            }});

            outcomeService.updateOutcome(outcome, function(response) {
                expect(response.hasError).toBe(false);
                expect(response.message).toBeNull();
                expect(response.data).toBeNull();
            });
        }));
    });
});
