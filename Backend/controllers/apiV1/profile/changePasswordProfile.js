/**
 * Created by cshlovjah on 17.02.18.
 */
var mongoose = require('mongoose');
var User = require('../../../models/user');

module.exports = function (req, res, next) {

    var password = req.body.password.trim()

    User.findOne({_id: req.user._id}, function (err, user) {
        if (err) {
            res.json({result: "error"})
        }
        var _password = user.generateHash(password)
        user.local.password = _password;
        user.save(function(err, result){
            if (err) {
                res.json({result: "error"})
            }
            console.log(result)
            res.json({message: "Password changed!"})
        })

    })




}