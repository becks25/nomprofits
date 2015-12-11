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
    image: {
        type: String
    },
    about: {
        type: String
    }
});



mongoose.model('Chef', schema);