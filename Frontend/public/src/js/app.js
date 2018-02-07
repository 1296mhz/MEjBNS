/**
 * Created by cshlovjah on 03.01.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'ModelsInit',
    'ViewsInit',
    'AppSandbox',
    'AdminBSB-Admin',
    'router',
    'SocketioService'
], function ($, _, Backbone,
             ModelsInit,
             ViewsInit,
             AppSandbox, AdminBSBAdmin, Router, SocketioService) {
    var initialize = function () {
        console.log("Dmitry Zyrjanov.\n");
        console.log("email: cshlovjah@gmail.com\n");
        console.log("phone: +7-(982)-630-24-45\n");

        Promise.all([
            ModelsInit.initialize(),
            ViewsInit.initialize(),
            SocketioService.initialize(),
        ]).then(()=>{
            Router.initialize();
        })
    }
    return {
        initialize: initialize
    };
});