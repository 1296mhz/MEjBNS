/**
 * Created by cshlovjah on 30.01.18.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('graceful-fs');

router.get('/', isLoggedIn, function (req, res, next) {
    // res.render('index', {title: 'Express'});
    var rstream = fs.createReadStream('./appStatic/app.html');
    rstream.pipe(res);
});

router.get('/login', function (req, res, next) {
    res.render('account/login.ejs', {message: req.flash('loginMessage')});
});

router.get('/signup', function (req, res) {
    res.render('account/signup.ejs', {message: req.flash('signupMessage')});
});

router.get('/forgot', function (req, res) {
    res.render('account/forgot.ejs', {message: req.flash('')});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('account/profile.ejs', {user: req.user});
});

router.get('/logout', function (req, res) {
    req.logout();
    //res.redirect('/');
    res.render('account/logout.ejs', {message: "Thank's for used this app"});
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
