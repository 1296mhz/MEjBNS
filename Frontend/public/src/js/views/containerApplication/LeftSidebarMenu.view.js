/**
 * Created by cshlovjah on 08.02.18.
 */
define(['jquery', 'underscore', 'backbone',
        'LeftSidebarMenuItemView',
        'text!LeftSidebarMenuTemplate',
        'AdminBSB-Demo'],
    function ($, _, Backbone, LeftSidebarMenuItemView, LeftSidebarMenuTemplate,
              AdminBSBDemo, Waves) {

        var LeftSidebarMenuView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize LeftSidebar Menu view");
                _.bindAll(this, 'render');
            },
            el: this.el,
            model: this.model,
            collection: this.collection,
            events: {},
            render: function () {
                var _this = this

                var compiledTemplate = _.template(LeftSidebarMenuTemplate);
                this.$el.empty();
                this.$el.append(compiledTemplate);

                app.collections.LeftSidebarMenuCollection.forEach(function (model) {
                    var itemMenuView = new LeftSidebarMenuItemView({model: model, id: model.get('id')});
                    $('#left-sidebar-menu').append(itemMenuView.render().el)
                }.bind(this))

                //$.AdminBSB.leftSideBar.activate();
                return this;
            }
        })
        return LeftSidebarMenuView
    })