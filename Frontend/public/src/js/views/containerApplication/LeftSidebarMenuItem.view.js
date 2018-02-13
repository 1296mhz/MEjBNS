/**
 * Created by cshlovjah on 08.02.18.
 */
define(['jquery', 'underscore', 'backbone', 'text!LeftSidebarMenuItemTemplate'],
    function ($, _, Backbone, LeftSidebarMenuItemTemplate) {
        var LeftSidebarMenuItemView = Backbone.View.extend({
            initialize: function () {
                _.bindAll(this, 'render');
            },
            tagName: "li",
            id: this.id,
            events: {
                'click a': 'clickFunc'
            },
            clickFunc: function(e){
                var $menuList = $('#left-sidebar-menu').children();
                $menuList.removeClass();
                $('#' + this.model.get('id')).addClass('active');
            },
            template: _.template(LeftSidebarMenuItemTemplate),
            model: this.model,
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return LeftSidebarMenuItemView
    });