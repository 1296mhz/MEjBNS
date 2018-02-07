/**
 * Created by cshlovjah on 21.01.18.
 */
define(['underscore','backbone'], function(_, Backbone){
    "use strict";
    var WebSiteTrafficModel = Backbone.Model.extend({
        initialize: function(){
            console.log("WebSiteTraffic model")
        },
        idAttribute: "_id",
        defaults:{
            bar: [0],
            count: 0,
            name: "WEBSITE TRAFFICS"
        }

    })

    return WebSiteTrafficModel
})