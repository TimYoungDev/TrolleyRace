"use strict";

trolleyApp.directive('googleSigninButton', function () {
    return {
        template: '<div></div>',
        scope: {buttonId: '@', options: '&'},
        link: function (scope, element, attrs) {
            var div = element.find('div')[0];
            div.id = attrs.buttonId;
            gapi.signin2.render(div.id, scope.options());
        }
    };
});
