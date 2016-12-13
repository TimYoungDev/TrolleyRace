"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:id', component: login_component_1.LoginComponent }
];
exports.loginRouteProviders = [];
exports.loginRoutes = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=login.routes.js.map