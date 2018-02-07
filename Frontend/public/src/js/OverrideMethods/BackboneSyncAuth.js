/**
 * Created by cshlovjah on 11.01.18.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
    "use strict";


    var BackboneSyncAuth = Backbone.sync;

    Backbone.sync = function (method, model, options) {

        options.headers = {
         
            'Authorization': 'Bearer ' + app.services.autheticate.getToken()
        }

        return BackboneSyncAuth(method, model, options);
    };


})