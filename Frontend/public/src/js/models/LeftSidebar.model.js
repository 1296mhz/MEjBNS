/**
 * Created by cshlovjah on 11.01.18.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
    "use strict";
    var LeftSidebarModel = Backbone.Model.extend({
         urlRoot: "/api/v1/getLeftMenu"
    })

    return LeftSidebarModel
})