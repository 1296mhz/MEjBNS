/**
 * Created by cshlovjah on 16.01.18.
 */
var express = require('express');
var passport = require('passport');
var routerApiV1 = express.Router();
var profileCtrlApi = require('../controllers/apiV1/profile');
var accountCtrlApi = require('../controllers/apiV1/account');


routerApiV1.get('/', isLoggedIn, function( req,res, next){
    "use strict";
    res.json({
        message: "Welcome to api"
    })
});

//Profile routes
routerApiV1.get('/profile', isLoggedIn, profileCtrlApi.getProfile);
routerApiV1.get('/profile/:id', isLoggedIn, profileCtrlApi.getProfileById);
routerApiV1.patch('/profile/:id', isLoggedIn, profileCtrlApi.updateProfile);
routerApiV1.post('/profile/uploadImage', isLoggedIn, profileCtrlApi.uploadImageProfile);

//Account
routerApiV1.get('/account', accountCtrlApi.getAccounts);
routerApiV1.get('/account/count', accountCtrlApi.getCountAccounts);
routerApiV1.get('/account/:id', accountCtrlApi.getAccountById);
routerApiV1.patch('/account/:id', accountCtrlApi.updateAccount);
routerApiV1.put('/account/:id', accountCtrlApi.updateAccount);
routerApiV1.post('/account', accountCtrlApi.createAccount);
routerApiV1.delete('/account/:id', accountCtrlApi.deleteAccount);

module.exports = routerApiV1;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}