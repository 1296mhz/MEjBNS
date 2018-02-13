/**
 * Created by cshlovjah on 06.02.18.
 */
define(['jquery', 'underscore', 'backbone', 'text!NotifyTemplate', 'bootstrap', 'bootstrap-notify'], function ($, _, Backbone, NotifyTemplate) {
    var NotifyView = Backbone.View.extend({
        initialize: function () {
            console.log("Notify view");
            _.bindAll(this, 'showNotification');
            var _this = this

            app.bus.on('Notify', function (objData) {
                console.log('Notify fire!')
                _this.showNotification(objData.color, objData.text , 'top', 'right', 'animated rotateInDownRight', 'animated rotateOutDownRight');
            })
        },
        el: this.el,
        events: {
            'click .test-event': 'testEvent'
        },
        testEvent: function () {
            "use strict";
            console.log("Test Event")
        },
        showNotification: function(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
            if (colorName === null || colorName === '' || colorName === undefined ) {
                colorName = 'bg-black';
            }
            if (text === null || text === '') {
                text = 'Notify message';
            }
            if (animateEnter === null || animateEnter === '') {
                animateEnter = 'animated fadeInDown';
            }
            if (animateExit === null || animateExit === '') {
                animateExit = 'animated fadeOutUp';
            }
            var allowDismiss = true;

            $.notify({
                    message: text
                },
                {
                    type: colorName,
                    allow_dismiss: allowDismiss,
                    newest_on_top: true,
                    timer: 1000,
                    placement: {
                        from: placementFrom,
                        align: placementAlign
                    },
                    animate: {
                        enter: animateEnter,
                        exit: animateExit
                    },
                    template: NotifyTemplate
                });
        },

        render: function () {
        }
    })
    return NotifyView
})