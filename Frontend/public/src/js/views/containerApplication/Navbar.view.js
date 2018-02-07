/**
 * Created by cshlovjah on 07.01.18.
 */

define(['jquery', 'underscore', 'backbone', 'text!NavbarTemplate', 'AdminBSB-Demo', 'bootstrap', 'jquery-validate'],
    function ($, _, Backbone, NavbarTemplate, AdminBSBDemo) {
    var NavbarView = Backbone.View.extend({
        initialize: function () {
            console.log("Initialize Navbar view");

            _.bindAll(this, 'render')
        },
        el: this.el,
        model: this.model,
        events: {},
        render: function () {
            var _this = this;

            var data = {};
            var compiledTemplate = _.template(NavbarTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate(this.model.toJSON()));
            
            $.AdminBSB.dropdownMenu.activate();
            $.AdminBSB.search.activate();

            AdminBSBDemo.activateNotificationAndTasksScroll();
        }
    });
    return NavbarView
})