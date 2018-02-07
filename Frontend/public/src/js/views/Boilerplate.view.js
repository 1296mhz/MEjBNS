/**
 * Created by cshlovjah on 07.01.18.
 */
define(['jquery','underscore','backbone', 'text!LogoutTemplate', 'bootstrap', 'waves', 'jquery-validate'], function($, _, Backbone,  LogoutTemplate){
    var IndexView = Backbone.View.extend({
        initialize: function(){
            console.log("Boilerplate view");
        },
        el: $('#container-b'),

        events: {
            'click .test-event': 'testEvent'
        },
        testEvent: function(){
            "use strict";
            console.log("Test Event")
        },
        render: function(){
            var data = {};
            var compiledTemplate = _.template(LogoutTemplate, data);
            this.$el.empty();
            this.$el.addClass('logout-page');
            this.$el.append(compiledTemplate);
        }
    })
    return IndexView
})