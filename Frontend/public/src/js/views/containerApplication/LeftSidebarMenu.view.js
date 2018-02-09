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
                _.bindAll(this, 'render', 'fetchCollection');


                this.listenTo(this.collection, 'all', this.render);
                this.fetchCollection();
            },
            el: this.el,
            model: this.model,
            collection: this.collection,
            events: {},
            fetchCollection: function(){
                this.collection.fetch({
                    success: function(){
                        console.log("Fetch collection complete")
                    }
                });
            },
            render: function () {
                var _this = this

                var compiledTemplate = _.template(LeftSidebarMenuTemplate);
                this.$el.empty();
                this.$el.append(compiledTemplate);

                app.collections.LeftSidebarMenuCollection.forEach(function (model) {
                    var itemMenuView = new LeftSidebarMenuItemView({model: model, id: model.get('id')});
                    $('#left-sidebar-menu').append(itemMenuView.render().el)
                }.bind(this))

                app.bus.once('LeftSidebarView:changeUrl', function(urlFragment){
                    console.log(urlFragment + '-id')
                    $('#' + urlFragment + '-id').addClass('active');
                })

                return this;
            }
        })
        return LeftSidebarMenuView
    })