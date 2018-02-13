/**
 * Created by cshlovjah on 03.01.18.
 */
/**
 * Created by cshlovjah on 03.01.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'IndexView',
    'DashboardView',
    'ProfileView',
    'CustomerAccountView'
], function ($,
             _,
             Backbone,
           ) {
    'use strict';
    var MainRouter = Backbone.Router.extend({
        initialize: function(){
            console.log("Router initialize");
        },
        routes: {
            '': 'index',
            '!': 'index',
            '!/': 'index',
            'dashboard': 'dashboard',
            'profile': 'profile',
            'customer-account': 'customerAccount'
        },
        index: function () {
            this.navigate('', { trigger: true });
            app.models.LeftSidebarModel.set('currentPath', 'dashboard')
            app.views.DashboardView.show();
        },
        dashboard: function () {
            this.navigate('dashboard', { trigger: true });
            app.models.LeftSidebarModel.set('currentPath', 'dashboard')
            app.views.DashboardView.show();
        },
        profile: function () {
            this.navigate('profile', { trigger: true });
            app.models.LeftSidebarModel.set('currentPath', 'profile')
            app.views.ProfileView.show();
        },
        customerAccount: function() {
            app.models.LeftSidebarModel.set('currentPath', 'customer-account')
            this.navigate('customer-account', { trigger: true });
            app.views.CustomerAccountView.show();
        }
    });

    var initialize = function(){
        app.routers.mainRouter = new MainRouter;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    }
});
