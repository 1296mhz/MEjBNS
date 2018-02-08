/**
 * Created by cshlovjah on 05.02.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'NavbarModel',
    'LeftSidebarModel',
    'LeftSidebarMenuItemModel',
    'UserInfoModel',
    'LeftSidebarFooter'
], function ($, _, Backbone,
             NavbarModel,
             LeftSidebarModel,
             LeftSidebarMenuItemModel,
             UserInfoModel,
             LeftSidebarFooter
) {
    var initialize = function () {
        console.log("Init models");
        app.models.NavbarModel = new NavbarModel();
        app.models.leftMenu = new LeftSidebarModel();
        app.models.UserInfoModel = new UserInfoModel();
        app.models.LeftSidebarMenuItemModel = new LeftSidebarMenuItemModel();
        app.models.LeftSidebarFooter = new LeftSidebarFooter();
    }
    return {
        initialize: initialize
    };
});