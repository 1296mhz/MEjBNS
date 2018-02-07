/**
 * Created by cshlovjah on 16.01.18.
 */
var User = require('../../models/user');
var multer = require('multer');
var fs = require('graceful-fs');
var mongoose = require('mongoose');
var _ = require('underscore');
var resizer = require('node-image-resizer');
var config = require('../../config/config.json');

exports.getProfile = async function (req, res, next) {

    var profileDoc = {}
    await User.findOne({_id: req.user._id}, function (err, doc) {
        profileDoc._id = doc._id;
        profileDoc.name = doc.local.name;
        profileDoc.email = doc.local.email;
        profileDoc.image = config.avatarImagesThumbPublic + 'small_' + doc.local.image
        return profileDoc
    });

    await res.json(profileDoc)
};

exports.getProfileById = async function (req, res, next) {

    var profileDoc = {}
    await User.findOne({_id: req.user._id}, function (err, doc) {
        profileDoc._id = doc._id;
        profileDoc.name = doc.local.name;
        profileDoc.email = doc.local.email;
        profileDoc.image = config.avatarImagesThumbPublic + 'small_' +doc.local.image
        return profileDoc
    });

    await res.json(profileDoc)
};
exports.updateProfile = function (req, res, next) {

    var _id = mongoose.mongo.ObjectId(req.params.id);


    var userId = String(req.user._id)
    var paramsId = String(req.params.id)

    if (userId === paramsId) {
        User.update({_id: req.user._id}, {$set: { 'local.name': req.body.name }},
            function (err, user) {
                res.json({message: "Profile updated!"})
            });
    } else {
        res.json({result: "error"})
    }

};

var storage = multer.diskStorage({
    destination: async function (req, file, callback) {

        await User.update({_id: req.user._id}, {$set: { 'local.image': file.originalname}},
            function (err, user) {});

        await callback(null, '.' + config.avatarImages);

    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('avatar')

exports.uploadImageProfile = function (req, res, next) {

    const setup = {
        all: {
            path: process.cwd() + config.avatarImagesThumb,
            quality: 80
        },
        versions: [ {
            quality: 100,
            prefix: 'small_',
            width: 300,
            height: 100
        }]
    };

    upload(req, res, async function (err) {

        if (err) {
            return
        }

        await resizer( process.cwd() + config.avatarImages + req.file.filename, setup);
        await res.json({message: "Avatar update completed!"});
    })

}