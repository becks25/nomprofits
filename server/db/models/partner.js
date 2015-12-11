'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    logo: {
        type: String
    },
    about: {
        type: String
    }
});



mongoose.model('Partner', schema);