var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('graceful-fs');
var appConfig = require('../config/app.json');

router.get('/', isLoggedIn, function (req, res, next) {
    var rstream = fs.createReadStream('./Frontend/html/index.html');
    rstream.pipe(res);
});

router.get('/login', function (req, res, next) {
    res.render('login.ejs', {
        title: appConfig.title,
        titleB: appConfig.titleB,
        slogan: appConfig.slogan,
        message: req.flash('loginMessage'),
    });
});

router.get('/signup', function (req, res) {
    res.render('signup.ejs', {
        title: appConfig.title,
        titleB: appConfig.titleB,
        slogan: appConfig.slogan,
        message: req.flash('signupMessage')
    });
});

router.get('/forgot', function (req, res) {
    res.render('forgot.ejs', {
        title: appConfig.title,
        titleB: appConfig.titleB,
        slogan: appConfig.slogan,
        message: req.flash('')
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    //res.redirect('/');
    res.render('logout.ejs', {message: "Thank's for used this app"});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
