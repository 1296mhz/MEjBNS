/**
 * Created by cshlovjah on 17.02.18.
 */

var User = require('../../../models/user');
var multer = require('multer');
var fs = require('graceful-fs');
var resizer = require('node-image-resizer');
var config = require('../../../config/config.json');

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

module.exports = function (req, res, next) {

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