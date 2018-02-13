/**
 * Created by cshlovjah on 11.01.18.
 */
define(['underscore','backbone'], function(_, Backbone){
    "use strict";
    var UserInfoModel = Backbone.Model.extend({
        initialize: function(){
            console.log("UserInfo model")
        },
        idAttribute: "_id",
        defaults:{
            name: "unknown",
            email: "unknown",
            image: "unknown"
        },
        urlRoot: "/api/v1/profile"
        
    })
    
    return UserInfoModel
})