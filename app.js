var cluster = require('cluster');
var io = [];
var cpuCount = require('os').cpus().length;
var workers = [];
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var request = require('request');
var flash = require('connect-flash');
var session = require('express-session');
var sessionStore = require('./Backend/modules/sessionStore');
var routes = require('./Backend/routes/index');
var apiV1 = require('./Backend/routes/api-v1');
var account = require('./Backend/routes/account');
var config = require('./Backend/config/database');

//Database connect
require('./Backend/models/db');

if (cluster.isMaster) {

    // Count the machine's CPUs
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        var worker = cluster.fork();

        //Listen to the message from worker
        worker.on('message', function (data) {
            //We send all workers'am message
            for (var j in workers) {
                workers[j].send(data);
            }
        });
        //Adding object worker to array
        workers.push(worker);
    }
}

if (cluster.isWorker) {

    var worker_id = cluster.worker.id;
    var express = require('express');
    var url = require('url');
    var appSocket = express();
    var serverSocket = require('http').Server(appSocket);
    io[worker_id] = require('socket.io')(serverSocket);
    serverSocket.listen(3030 + worker_id);

    io[worker_id].on('connection', function (socket) {

        socket.on('getClients', function () {
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

    var app = express();

    app.listen(3000);

    app.set('views', path.join(__dirname, 'Backend/views/'));
    app.set('view engine', 'ejs');
    app.disable('x-powered-by');
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('combined'));
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, './Frontend/public')));

    app.use(session({
        secret: 'shhsecret', resave: true, saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: sessionStore
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

   require('./Backend/modules/passport')(passport);

    app.get('/getPort', function (req, res) {

        console.log('get_port');
        res.json({ "get_port": 3030 + worker_id})
    });

    app.get('/appStatus/', function (req, res) {

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var id = query.id;
        var msg = query.msg;
        var port = parseInt(query.port);

        var JSON_DATA = {"worker_id": worker_id, "id": id, "msg": msg, "port":port}

        // io[port - 3030].to(msg.id).emit('news', msg.msg);

        io[worker_id].to(msg.id).emit('news', msg.msg);

        //Sending all data to the processes
        process.send(JSON_DATA);

        res.json(JSON_DATA);

    });

    app.use('/', routes);
    app.use('/api/v1', apiV1);

    //------------------------------------------------------------------------------------//

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });

    //Processing message from worker
    process.on('message', function (msg) {
        console.log(worker_id);
        console.log(msg.id);
        console.log(msg.msg);
        io[worker_id].to(msg.id).emit('news', msg.msg);
    });
}

module.exports = app;
