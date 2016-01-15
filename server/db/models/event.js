'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var objId = mongoose.Schema.ObjectId;

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    price: {
        type: Number
    },
    place: {
        type:String
    },
    location: {
        type: String
    },
    url: {
        type: String
    },
    image: {
        type: String
    },
    about: {
        type: String
    },
    chefs: [{
        type: objId,
        ref: 'Chef'
    }],
    partners: [{
        type: objId,
        ref: 'Partner'
    }],
    menu: {
        type:String
    }
});



mongoose.model('Event', schema);