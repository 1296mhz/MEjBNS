/**
 * Created by cshlovjah on 05.02.18.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
    "use strict";
    var NavbarModel = Backbone.Model.extend({
        defaults: {
            navbarBrand: "my",
            navbarBrandFat: "Project"
        }
    })

    return NavbarModel
});