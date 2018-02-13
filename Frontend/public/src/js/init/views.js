/**
 * Created by cshlovjah on 05.02.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'IndexView',
    'DashboardView',
    'ProfileView',
    'CustomerAccountView'
], function ($, _, Backbone,
             IndexView,
             DashboardView,
             ProfileView,
             CustomerAccountView
             ) {
    var initialize = function () {
        console.log("Initialize views");
        app.views.IndexView = new IndexView();
        app.views.IndexView.render();
        app.views.DashboardView = new DashboardView({el: $('dashboard-section')});
        app.views.ProfileView = new ProfileView({el: $('profile-section'), model: app.models.UserInfoModel });
        app.views.CustomerAccountView = new CustomerAccountView({el: $('customer-account-section')});
        app.views.DashboardView.render();
        app.views.CustomerAccountView.render();

    }
    return {
        initialize: initialize
    };
});