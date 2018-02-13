/**
 * Created by cshlovjah on 15.01.18.
 */
define(['underscore','backbone', 'backbone-model-file-upload'], function(_, Backbone){
    "use strict";
    var AvatarFileModel = Backbone.Model.extend({
        initialize: function(){
            console.log("Avatar file model")
        },
        urlRoot: "/api/v1/profile/uploadImage", 
        fileAttribute: 'avatar'
    })

    return AvatarFileModel
})