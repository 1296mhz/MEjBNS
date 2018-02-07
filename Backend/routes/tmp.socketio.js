/**
 * Created by cshlovjah on 03.02.18.
 */
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
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var config = require('../config/database');
var cookieParser = require('socket.io-cookie-parser');
var passport = require('passport');
let connections = [];
var session_storage = new MongoDBStore(
    {
        uri: config.dbSessionURI,
        collection: 'sessions'
    });

io.use(cookieParser('shhsecret', {
    decode: function (str) {
        return str.replace('-', '_');
    }
}));

io.use(authorization);

/*
 io.on('connection', function (socket) {

 // connections.push(socket);
 // socket.emit("connection", { message: "Hello"})
 // socket.emit("myAuth", { message: [{ socket: socket.request.cookies}, { socket: socket.request.signedCookies}]})

 socket.on('getClients', function () {
 console.log("get Clients FIRE!")
 socket.emit('clients', {message: "Client's list"});
 });

 var counter = 0;
 var min = 999;
 var max = 100000;

 setInterval(function(){
 counter = Math.floor(Math.random() * (max - min)) + min;
 socket.emit('webTraffic', { count: counter, bar: [ 0,4,3,4,6,7 ]})
 }, 500)

 });
 */


io.on('connection', function (socket) {
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

io.use(cookieParser());
io.use(session({
    secret: 'shhsecret', resave: true, saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: session_storage
}));



function authorization(socket, next) {
    console.log("Athenticate")
    socket.emit("myAuth", {
        message: [
            {socket: socket.request.cookies}
        ]
    })
    next(socket)
    // cookies are available in:
    // 1. socket.request.cookies
    // 2. socket.request.signedCookies (if using a secret)
};


server.listen(4200);

module.exports = server;
