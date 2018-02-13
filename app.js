var cluster = require('cluster');
var express = require('express');
var io = [];
var cpuCount = require('os').cpus().length;
var workers = [];
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieParserSocketIO = require('socket.io-cookie-parser');
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
const moment = require('moment');
moment.locale('ru');
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
    var sessionID = null;
    var app = express();
    app.listen(3000);

    app.set('views', path.join(__dirname, 'Backend/views/'));
    app.set('view engine', 'ejs');
    app.disable('x-powered-by');
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    // app.use(logger('combined'));
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

    //app.use(require('./Backend/modules/webTrafficCounter'))

    app.use(function (req, res, next) {
        sessionID = req.sessionID
        console.log("Первый мидл: ", sessionID)
        next()
    })
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


    var worker_id = cluster.worker.id;
    const url = require('url');
    const appSocket = express();
    const serverSocket = require('http').Server(appSocket);
    io[worker_id] = require('socket.io')(serverSocket);
    serverSocket.listen(3030 + worker_id);

    io[worker_id].use(cookieParserSocketIO());

    io[worker_id].use(authorization);

    io[worker_id].on('connection', function (socket) {

        console.log("Сокет подключен: ")

        socket.emit('token', sessionID)

        socket.emit('welcome', {message: "Добро пожвловать!</br> Сегодня: " + moment().format('LL')});

        socket.on('getClients', function () {
            socket.emit('clients', {message: "Client's list"});
        });

        socket.on('disconnecting', (reason) => {
            console.log("Client disconnected")
        });

        var counter = 0;
        var min = 1;
        var max = 10;

        setInterval(function () {
            counter = Math.floor(Math.random() * (max - min)) + min;
            var i1 = Math.floor(Math.random() * (max - min)) + min;
            var i2 = Math.floor(Math.random() * (max - min)) + min;
            var i3 = Math.floor(Math.random() * (max - min)) + min;
            var i4 = Math.floor(Math.random() * (max - min)) + min;
            var i5 = Math.floor(Math.random() * (max - min)) + min;
            var i6 = Math.floor(Math.random() * (max - min)) + min;
            socket.emit('webTraffic', {count: counter, bar: [i1, i2, i3, i4, i5, i6]})
        }, 1000)
    });

    function authorization(socket, next) {
        console.log("Авторизация сессии")
        console.log("Сессия для авторизации: ", sessionID)

        sessionStore.get(sessionID, function (err, session) {
            if (err) {
                console.log("Ошибка: ", err)
                throw err
            };
            console.log("Текущая сессия", session)
            if (session === undefined) {
                console.log("Сохраненная сессия")
                console.log(sessionID)
            }
            next()
        });
    }

    //Processing message from worker
    process.on('message', function (msg) {
        console.log(worker_id);
        console.log(msg.id);
        console.log(msg.msg);
        io[worker_id].to(msg.id).emit('news', msg.msg);
    });
}

module.exports = app;
