/**
 * Created by cshlovjah on 16.01.18.
 */
define(['underscore','backbone'], function(_, Backbone){
    "use strict";
    var DashboardModel = Backbone.Model.extend({
        initialize: function(){
            console.log("Dashboard")
        }
    })

    return DashboardModel
})