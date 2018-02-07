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
            console.log("Router initialize")
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
            app.bus.trigger('LeftSidebarView:changeUrl', 'dashboardid')
            $('content-section').children().removeClass()
            $('content-section').children().addClass('section-hide')
            app.views.DashboardView.render();
            app.views.DashboardView.show();

        },
        dashboard: function () {
            this.navigate('dashboard', { trigger: true });
            app.bus.trigger('LeftSidebarView:changeUrl', 'dashboardid')
            $('content-section').children().removeClass()
            $('content-section').children().addClass('section-hide')
            app.views.DashboardView.render();
            app.views.DashboardView.show();
        },
        profile: function () {
            this.navigate('profile', { trigger: true });
            app.bus.trigger('LeftSidebarView:changeUrl', 'profileid')
            $('content-section').children().removeClass()
            $('content-section').children().addClass('section-hide')
            app.views.ProfileView.render();
            app.views.ProfileView.show();
        },
        customerAccount: function(){
            this.navigate('customer-account', { trigger: true });
            app.bus.trigger('LeftSidebarView:changeUrl', 'customeraccountsid')
            $('content-section').children().removeClass()
            $('content-section').children().addClass('section-hide')
            app.views.CustomerAccountView.render();
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
