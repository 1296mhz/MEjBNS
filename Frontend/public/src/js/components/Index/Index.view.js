/**
 * Created by cshlovjah on 07.01.18.
 */
define([
    'jquery',
    'underscore', 
    'backbone', 
    'text!IndexTemplate', 
    'NavbarView',
    'LeftSidebarView',
    'RightSidebarView',
    'NotifyView',
    'bootstrap',
    'AdminBSB-Admin',
    'waves', 
    'jquery-validate'], 
    function ($, _, Backbone, IndexTemplate, NavbarView, LeftSidebarView, RightSidebarView, NotifyView) {
    var IndexView = Backbone.View.extend({
        initialize: function () {
            console.log("Initialize Index view");
            _.bindAll(this, 'render')
        },
        el: $('#container-application'),
        events: {},
        render: function () {
            var data = {};
            var compiledTemplate = _.template(IndexTemplate, data);
            this.$el.empty();
            this.$el.addClass('index-page');
            this.$el.addClass('theme-red');
            this.$el.append(compiledTemplate);
            
            app.views.Navbar = new NavbarView({ el: $('navbar-main'), model: app.models.NavbarModel });
            app.views.LeftSidebar = new LeftSidebarView({ el: $('left-sidebar')});
            app.views.RightSidebarView = new RightSidebarView({ el: $('right-sidebar')});
            app.views.Notify = new NotifyView({ el: this.$el });
            app.views.Navbar.render();
            app.views.LeftSidebar.render();
            app.views.RightSidebarView.render();

            setTimeout(function () {
                $('.page-loader-wrapper').fadeOut();
            }, 500);
        }
    })
    return IndexView
})