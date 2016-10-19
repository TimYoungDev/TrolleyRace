
describe('ResultCard', function () {
    var el;

    beforeEach(module('trolleyApp'));
    beforeEach(module('app/components/results/result.card.html'));

    beforeEach(inject(function($compile, $rootScope) {
        var scope = $rootScope.$new();
        el = angular.element('<result-card name="Anon" winner="Tim" comments="hello"></result-card>');
        $compile(el)(scope);
        scope.$digest();
        console.log(el[0].outerHTML);
    }));

    it('Should bind name, winner, and comments', function () {
        var elementText = el.text();
        expect(elementText).toContain('Winner: Tim');
        expect(elementText).toContain('Anon');
        expect(elementText).toContain('hello');
    });
});
