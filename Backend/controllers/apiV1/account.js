/**
 * Created by cshlovjah on 30.01.18.
 */
var Account = require('../../models/account');
var multer = require('multer');
var fs = require('graceful-fs');
var mongoose = require('mongoose');
var _ = require('underscore');
var resizer = require('node-image-resizer');
var config = require('../../config/app.json');
var passport = require('passport');

function handleError(err, callback) {
    console.log("Error")
    console.log(err)
    callback.json({message: err})
}

exports.getAccounts = async function (req, res, next) {
    var accountsDocs = await Account.find({}, function (err, docs) {
        if (err) return handleError(err, res);
        return docs
    });

    await res.json(accountsDocs)
};

exports.getCountAccounts = async function (req, res, next) {
    var accountsCount = await Account.find({}, function (err, docs) {
        if (err) return handleError(err, res);
        return docs
    });

    await console.log(accountsCount.length)
    await res.json({ message: accountsCount.length})
};

exports.getAccountById = async function (req, res, next) {

    var accountsDoc = await Account.findOne({_id: req.params.id}, function (err, doc) {
        if (err) return handleError(err, res);
        return doc
    });

    await res.json(accountsDoc)
};

exports.updateAccount = async function(req, res, next){

    await Account.update({ _id: req.params.id }, { $set: {
        'local.name': req.body.name,
        'local.email': req.body.email,
        'local.changedAt': new Date()
    }}, function(err, result){
        if (err) return handleError(err, res);
        console.log(result)
        res.json({ message: "ok"});
    })
}

exports.createAccount = async function (req, res, next) {

    process.nextTick(function () {
        Account.findOne({'local.email': req.body.email}, function (err, user) {
            if (err)
                if (err) return handleError(err, res);
            if (user) {
                res.json({message: 'That email is already taken.'})
            } else {
                var newUser = new Account();
                newUser.local.email = req.body.email;
                newUser.local.name = req.body.name;
                newUser.local.image = "user.png";
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.save(function (err, result) {
                    if (err) handleError(err, res)
                    res.json({message: "ok"})
                });
            }
        });
    });
};

exports.deleteAccount = async function(req, res, next){
    Account.remove({ _id: req.params.id}, function(err, result ){
        if (err) return handleError(err, res);
        res.json({ message: result})
    })
}


