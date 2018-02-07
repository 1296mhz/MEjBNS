/**
 * Created by cshlovjah on 05.02.18.
 */
/**
 * Created by cshlovjah on 09.01.18.
 */
define(['jquery', 'underscore', 'backbone',
        'text!LeftSideBarFooterTemplate',
        'AdminBSB-Demo'],
    function ($, _, Backbone, LeftSidebarTemplate,
              AdminBSBDemo, Waves) {

        var LeftSidebarFooterView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize LeftSidebar Footer view");
                _.bindAll(this, 'render');
            },
            el: this.el,
            model: this.model,
            events: {},
            render: function () {
                var _this = this

                var compiledTemplate = _.template(LeftSidebarTemplate);

                this.$el.empty();
                this.$el.append(compiledTemplate(this.model.toJSON()));
            }
        })
        return LeftSidebarFooterView
    })