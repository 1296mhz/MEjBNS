/**
 * Created by cshlovjah on 03.02.18.
 */
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var config = require('../config/database');

var store = new MongoDBStore(
    {
        uri: config.dbSessionURI,
        collection: 'sessions'
    });

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

module.exports = store