/**
 * Created by cshlovjah on 18.01.18.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server, {
    transports: ['websocket', 'polling',],
    pingInterval: 10000,
    pingTimeout: 5000
});
var Cookies = require('cookies')
var config = require('../config/database');
var cookieParser = require('socket.io-cookie-parser');
var sessionStore = require('../modules/sessionStore');

var sharedSession = require("express-socket.io-session");

io.use(cookieParser());

io.on('connection', function (socket) {
    console.log(socket.request.cookies)

    socket.on('getClients', function () {
        console.log("get Clients FIRE!")
        socket.emit('clients', {message: "Client's list"});
    });

    var counter = 0;
    var min = 999;
    var max = 100000;

    setInterval(function () {
        counter = Math.floor(Math.random() * (max - min)) + min;
        socket.emit('webTraffic', {count: counter, bar: [0, 4, 3, 4, 6, 7]})
    }, 500)
});

server.listen(4200);

module.exports = server;
