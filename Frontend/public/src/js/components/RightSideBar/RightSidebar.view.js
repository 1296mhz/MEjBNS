/**
 * Created by cshlovjah on 11.01.18.
 */
/**
 * Created by cshlovjah on 09.01.18.
 */
define(['jquery', 'underscore', 'backbone', 'text!RightSidebarTemplate', 'AdminBSB-Demo', 'bootstrap', 'jquery-validate'], function ($, _, Backbone, RightSidebarTemplate, AdminBSBDemo) {
    var RightSidebarView = Backbone.View.extend({
        initialize: function () {
            console.log("Initialize RightSidebar view");
            _.bindAll(this, 'render')
        },
        el: this.el,

        events: {},

        render: function () {

            var data = {};
            var compiledTemplate = _.template(RightSidebarTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            $.AdminBSB.rightSideBar.activate();

            AdminBSBDemo.skinChanger();
            AdminBSBDemo.setSkinListHeightAndScroll(true);
            AdminBSBDemo.setSettingListHeightAndScroll(true);

            $(window).resize(function () {
                AdminBSBDemo.setSkinListHeightAndScroll(false);
                AdminBSBDemo.setSettingListHeightAndScroll(false);
            });
        }

    })
    return RightSidebarView
})