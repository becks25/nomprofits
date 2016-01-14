'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Partner = mongoose.model('Partner');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//get all Partners
router.get('/', ensureAuthenticated, (req, res, next) => {
    Partner.find().exec()
        .then(partner => res.status(200).send(partner))
        .then(null, next);
});

//get one
router.get('/:partnerId', ensureAuthenticated, (req,res,next) => {
     res.send(req.foundPartner);

});

//create a new Partner
router.post('/', ensureAuthenticated, (req, res, next) => {
    Partner.create(req.body)
        .then(function(newPartner){
            res.status(201).send(newPartner);
        })
        .then(null, next); 
});

//edit existing Partner
router.put('/:partnerId', ensureAuthenticated, (req, res, next) => {
    _.assign(req.foundPartner, req.body);
    req.foundPartner.save()
        .then(partner => res.status(200).send(partner))
        .then(null, next);
});

router.delete('/:partnerId', ensureAuthenticated, (req, res, next) => {
    Partner.remove({_id: req.foundPartner._id}).exec()
        .then(removed => res.status(200).send(removed))
        .then(null, next);
});

router.param('partnerId', (req, res, next, partnerId) => {
    Partner.findById(partnerId)
    .then(partner => {
            req.foundPartner = partner;
            next();
        })
    .then(null, next)
});