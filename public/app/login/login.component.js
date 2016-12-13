"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var auth_service_1 = require('../auth/auth.service');
var LoginComponent = (function () {
    function LoginComponent(authService) {
        this.authService = authService;
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // var _this: any = this;
        this.authService.login(this.username, this.password)
            .subscribe(function (res) {
            _this.data = res;
            _this.jwt = _this.data.jwt;
            localStorage.setItem('jwt', _this.data.jwt);
        }, function (err) { return console.log(err); });
    };
    LoginComponent.prototype.logout = function () {
        this.jwt = null;
        localStorage.removeItem('jwt');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login.component.pug',
            styleUrls: ['login.component.scss'],
            providers: [auth_service_1.AuthService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map