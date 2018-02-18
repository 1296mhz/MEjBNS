/**
 * Created by cshlovjah on 17.02.18.
 */
var mongoose = require('mongoose');
var User = require('../../../models/user');

module.exports = function (req, res, next) {

    var _id = mongoose.mongo.ObjectId(req.params.id);

    console.log(_id)
    var userId = String(req.user._id)
    var paramsId = String(req.params.id)

    console.log(userId)
    console.log(paramsId)

    if (userId === paramsId) {
        User.update({_id: req.user._id}, {$set: { 'local.name': req.body.name }},
            function (err, user) {
                res.json({message: "Profile updated!"})
            });
    } else {
        res.json({result: "error"})
    }
};