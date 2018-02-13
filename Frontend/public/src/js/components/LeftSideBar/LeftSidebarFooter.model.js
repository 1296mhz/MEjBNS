/**
 * Created by cshlovjah on 05.02.18.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
    "use strict";
    var LeftSidebarFooterModel = Backbone.Model.extend({
        defaults: {
            copyright: "cshlovjah",
            version: "1.0",
            years: "2017-2018"
        }
    })

    return LeftSidebarFooterModel
});