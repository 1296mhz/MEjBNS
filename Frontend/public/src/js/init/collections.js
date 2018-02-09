/**
 * Created by cshlovjah on 08.02.18.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'LeftSidebarMenuCollection'
], function ($, _, Backbone,
             LeftSidebarMenuCollection) {
    var initialize = function () {
        console.log("Init collections");
        app.collections.LeftSidebarMenuCollection = new LeftSidebarMenuCollection()
    }
    return {
        initialize: initialize
    };
});