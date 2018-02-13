/**
 * Created by cshlovjah on 02.02.18.
 */
define(['socketio'], function (io) {
    'use strict';

    var initialize = function () {
        console.log("Socketio initialize")
        io.socket = io.connect('http://localhost:3032', {
            query: 'token=' + 'xxx'
        });
        /*
         * Message on connection
         */
        io.socket.on('news', function (data) {
            console.log("NEWS: ")
            console.log(data)
        });

        io.socket.on('connect', function () {
            console.log("I am connected")
        });

        io.socket.on('token', function (data) {
            app.bus.trigger('Notify', { text: data , color: 'bg-blue' });
        });

        io.socket.on('welcome', function (data) {
            app.bus.trigger('Notify', { text: data.message , color: 'bg-blue' });
        });

        io.socket.on('Page:reload', function(){
            location.reload();
        })

        io.socket.on('webTraffic', function (data) {
            app.bus.trigger('webTraffic', data)

        });

    };
    return {initialize: initialize};
});
