/**
 * Created by cshlovjah on 08.02.18.
 */
define(['underscore','backbone', 'LeftSidebarMenuItemModel' ], function(_, Backbone, LeftSidebarMenuItemModel){
    "use strict";
    var LeftSidebarMenuCollection = Backbone.Collection.extend({
        initialize: function(){
            console.log("Initialize Leftsidebar collection")
        },
        url: "/api/v1/getLeftMenu",
        model: LeftSidebarMenuItemModel
    });

    return LeftSidebarMenuCollection
})