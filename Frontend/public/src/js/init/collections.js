/**
 * Created by cshlovjah on 08.02.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'LeftSidebarMenuCollection'
], function ($, _, Backbone,
             LeftSidebarMenuCollection
) {
    var initialize = function () {
        console.log("Init collections");
        app.collections.LeftSidebarMenuCollection = new LeftSidebarMenuCollection([
            {
                id: "dashboardid",
                href: "#dashboard",
                icon: "dashboard",
                name: "Dashboard"
            },
            {
                id: "profileid",
                href: "#profile",
                icon: "face",
                name: "My profile"
            },
            {
                id: "customeraccountsid",
                href: "#customer-account",
                icon: "account_box",
                name: "Customer Accounts"
            }
        ]);
    }
    return {
        initialize: initialize
    };
});