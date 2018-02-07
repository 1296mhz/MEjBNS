/**
 * Created by cshlovjah on 09.01.18.
 */
define(['jquery', 'underscore', 'backbone',
        'text!LeftSidebarTemplate',
        'LeftSidebarModel',  'UserInfoModel',
        'UserInfoView', 'LeftSidebarFooterView',
        'AdminBSB-Demo', 'waves',
        'jquery-slimscroll', 'bootstrap', 'jquery-validate'],
    function ($, _, Backbone, LeftSidebarTemplate,
              LeftSidebarModel,
              UserInfoModel,
              UserInfoView,
              LeftSidebarFooterView,
              AdminBSBDemo, Waves) {

        var LeftSidebarView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize LeftSidebar view");
                _.bindAll(this, 'render');
            },
            el: this.el,
            model: app.models.leftMenu,
            events: {},
            render: function () {
                var _this = this

                var compiledTemplate = _.template(LeftSidebarTemplate);

                this.$el.empty();
                this.$el.append(compiledTemplate());

                $.AdminBSB.leftSideBar.activate();

                app.views.UserInfo = new UserInfoView({el: $('user-info'), model: app.models.UserInfoModel});
                app.views.LeftSidebarFooterView = new LeftSidebarFooterView({ el: $('sidebar-footer'), model: app.models.LeftSidebarFooter }).render()
            }
        });
        return LeftSidebarView
    })