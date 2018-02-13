/**
 * Created by cshlovjah on 08.02.18.
 */
define(['backbone'], function(Backbone){
    var LeftSidebarMenuItemModel = Backbone.Model.extend({
        defaults: {
            id: "",
            href: "",
            icon: "",
            name: ""
        }
    });

    return LeftSidebarMenuItemModel
});