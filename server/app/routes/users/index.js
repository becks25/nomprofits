'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var User = mongoose.model('User');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//get all users
router.get('/', ensureAuthenticated, (req, res, next) => {
    User.find().exec()
        .then(users => res.status(200).send(users))
        .then(null, next);
});

//get one
router.get('/:userId', ensureAuthenticated, (req,res,next) => {
    console.log('hi', req.foundUser);
     res.send(req.foundUser);

});

//create a new user
router.post('/', ensureAuthenticated, (req, res, next) => {
    User.create(req.body)
        .then(function(newUser){
            res.status(201).send(newUser);
        })
        .then(null, next); 
});

//edit existing user
router.put('/:userId', ensureAuthenticated, (req, res, next) => {
    _.assign(req.foundUser, req.body);
    req.foundUser.save()
        .then(user => res.status(200).send(user))
        .then(null, next);
});

router.delete('/:userId', ensureAuthenticated, (req, res, next) => {
    User.remove({_id: req.foundUser._id}).exec()
        .then(removed => res.status(200).send(removed))
        .then(null, next);
});

router.param('userId', (req, res, next, userId) => {
    User.findById(userId)
    .then(user => {
            req.foundUser = user;
            next();
        })
    .then(null, next)
});