const cluster = require('cluster');
const express = require('express');
const io = [];
const cpuCount = require('os').cpus().length;
const workers = [];
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieParserSocketIO = require('socket.io-cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const request = require('request');
const flash = require('connect-flash');
const session = require('express-session');
const sessionStoreApp = require('./Backend/modules/sessionStoreApp');
const routes = require('./Backend/routes/index');
const apiV1 = require('./Backend/routes/api-v1');
const account = require('./Backend/routes/account');
const config = require('./Backend/config/database');

const sessionStoreAppSocket = require('./Backend/modules/sessionStoreAppSocket');

const querystring = require('querystring');

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
    var connectSid = null;

    var app = express();
    app.listen(3000);
    app.disable('x-powered-by');
    app.set('views', path.join(__dirname, 'Backend/views/'));
    app.set('view engine', 'ejs');
    app.disable('x-powered-by');
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //app.use(logger('combined'));

    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, './Frontend/public')));

    app.use(session({
        secret: 'shhsecret', resave: true, saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: sessionStoreApp
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    require('./Backend/modules/passport')(passport);

    //app.use(require('./Backend/modules/webTrafficCounter'))
    app.use(function (req, res, next) {
        sessionID = req.sessionID
        connectSid = req.cookies['connect.sid']
        next()
    })

    app.use('/', routes);
    app.use('/api/v1', apiV1);

    //------------------------------------------------------------------------------------//

    eventEmitter.addListener('fuckyou', function(req,res){
       // console.log(req.cookies['connect.sid'])
    });

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

    io[worker_id].use(cookieParserSocketIO('shhsecret', {
        decode: function (str) {
            return str.replace('-', '_');
        }
    }));

    io[worker_id].use(authorization);

    io[worker_id].on('connection', function (socket) {

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

        var socketConnectSid = querystring.unescape(socket.request.cookies['connect.sid'])


        function getSessionStoreApp(s){
            sessionStoreApp.get(s, function (err, session) {
                console.log("Сессия найдена в хранилище")
                if (err) {
                    console.log("Ошибка: ", err)
                    throw err
                };
                console.log("Текущая сессия", session)
                if (session === undefined) {
                    console.log("Сессия не найдена")
                }
                next()
            });

        }

        if (socketConnectSid === connectSid) {
            console.log("Сессии одинаковы")
            getSessionStoreApp(connectSid)
        } else {
            console.log("Сессии не равна сессии web")
            getSessionStoreApp(connectSid)
            io[worker_id].on('connection', function (socket) {
                socket.emit('disconnect', 'Ошибка')
            })
        }
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
