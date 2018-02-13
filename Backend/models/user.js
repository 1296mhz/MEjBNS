var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validator');

var alphaChar = [
    validate({
        validator: 'isLength',
        arguments: [3, 35],
        message: 'Name should be between 3 and 35 characters'
    }),
    // validate({
    //     validator: 'isAlphanumeric',
    //     passIfEmpty: true,
    //     message: 'Name should contain alpha-numeric characters only'
    // })
];

var userSchema = mongoose.Schema({
    local: {
        name: {
            type: String,
            unique: true,
            required: true,
            validate: alphaChar
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            },
        },
        imageBin: Buffer,
        image: String,
        password: String,
        createdAt: {type: Date, default: Date.now},
        changedAt: {type: Date}
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    vkontakte: {
        id: String,
        name: String,
        token: String,
        photo: String
    },
    odnoklassniki: {
        id: String,
        name: String,
        token: String,
        photo: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
