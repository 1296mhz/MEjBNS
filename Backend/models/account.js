/**
 * Created by cshlovjah on 30.01.18.
 */
/**
 * Created by cshlovjah on 29.01.18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validator');
var ObjectId = mongoose.Schema.Types.ObjectId;

var alphaChar = [
    validate({
        validator: 'isLength',
        arguments: [3, 35],
        message: 'Name should be between 3 and 35 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];

var accountUsersSchema = mongoose.Schema({
    parentAccount:  [{ type: ObjectId, ref: 'Account' }],
    name: {
        type: String,
        unique: true,
        required: true,
        validate: alphaChar
    },
    password: String,
    role: String,
    createdAt: {type: Date, default: Date.now},
    changedAt: {type: Date}
});

var accountSchema = mongoose.Schema({
    local: {
        name: {
            type: String,
            unique: true,
            required: true,
            // validate: alphaChar
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
        image: String,
        // accountUsers: [{ type: ObjectId, ref: 'AccountUsers' }],
        password: String,
        createdAt: {type: Date, default: Date.now},
        changedAt: {type: Date}
    }
});

accountSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

accountUsersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountUsersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('AccountUsers', accountUsersSchema);
module.exports = mongoose.model('Account', accountSchema);