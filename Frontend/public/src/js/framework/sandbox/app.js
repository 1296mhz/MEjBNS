/**
 * Created by cshlovjah on 03.01.18.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
        window.app = {}; // Main application object
        app.routers = {}; // Object containing controllers
        // to enable switching between the application modules.
        app.models = {}; // Object storing data models
        app.views = {}; // Object containing controllers to
        app.views.widgets = {};
        // define application interfaces and their behavior.
        app.collections = {};
        app.services = {};
        app.core = {};
        // The core of our application. It contains a
        // "sandbox" object.
        app.modules = {};
        // The object containing controllers of other
        // system modules

        app.bus = {}
        _.extend(app.bus, Backbone.Events);
        app.bus.on('bus', function () {
            "use strict";
            console.log("Main app bus")
        })
    }
);