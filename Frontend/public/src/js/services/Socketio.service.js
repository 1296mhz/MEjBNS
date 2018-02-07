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


       // io.socket.emit('cookie', { sid: "login"});

        io.socket.on('myAuth', function (data) {
            console.log(data)
        });

        io.socket.on('webTraffic', function (data) {
            app.bus.trigger('webTraffic', data)
        });

    };
    return {initialize: initialize};
});
