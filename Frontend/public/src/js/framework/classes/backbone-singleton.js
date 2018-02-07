/**
 * Created by cshlovjah on 03.01.18.
 */

(function(root, factory) {

    if (typeof exports !== 'undefined') {
        // Define as CommonJS export:
        module.exports = factory(require("underscore"), require("backbone"));
    } else if (typeof define === 'function' && define.amd) {
        // Define as AMD:
        define(["underscore", "backbone"], factory);
    } else {
        // Just run it:
        factory(root._, root.Backbone);
    }

}(this, function(_, Backbone) {

    // Singleton namespace:
    var Singleton = Backbone.Singleton = {
        getInstance: function () {
            if (this._instance === undefined) {
                this._instance = new this();
            }
            return this._instance;
        }
    }

    return Singleton;
}));
