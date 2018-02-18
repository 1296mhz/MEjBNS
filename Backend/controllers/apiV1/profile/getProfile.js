/**
 * Created by cshlovjah on 17.02.18.
 */
var User = require('../../../models/user');
var config = require('../../../config/config.json');

module.exports = async function (req, res, next) {

    console.log()
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