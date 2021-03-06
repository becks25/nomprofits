'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Event = mongoose.model('Event');
var Chef = mongoose.model('Chef');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


//get all events
router.get('/', (req, res, next) => {
    Event.find().exec()
        .then(events => res.status(200).send(events))
        .then(null, next);
});

//get one
router.get('/:eventId', (req,res,next) => {
     res.send(req.foundEvent);

});

//create a new Event
router.post('/', ensureAuthenticated, (req, res, next) => {
    if(!req.body.chefs) req.body.chefs = [];
    if(req.body.chefsId){
        req.body.chefsId.forEach(chef => {
            req.body.chefs.push(chef);
        });
    };

    if(!req.body.partners) req.body.partners = [];
    if(req.body.partnersId){
        req.body.partnersId.forEach(partner => {
            req.body.partners.push(partner);
        });
    };

    Event.create(req.body)
        .then(function(newEvent){
            res.status(201).send(newEvent);
        })
        .then(null, next); 
});

//edit existing Event
router.put('/:eventId', ensureAuthenticated, (req, res, next) => {
    _.assign(req.foundEvent, req.body);

    if(!req.foundEvent.chefs) req.foundEvent.chefs = [];
    if(req.body.chefsId){
        req.body.chefsId.forEach(chef => {
            req.foundEvent.chefs.push(chef);
        });
    };

    if(!req.foundEvent.partners) req.foundEvent.partners = [];
    if(req.body.partnersId){
        req.body.partnersId.forEach(partner => {
            req.foundEvent.partners.push(partner);
        });
    };


    req.foundEvent.save()
        .then(events => res.status(200).send(events))
        .then(null, next);
});

router.delete('/:eventId', ensureAuthenticated, (req, res, next) => {
    Event.remove({_id: req.foundEvent._id}).exec()
        .then(removed => res.status(200).send(removed))
        .then(null, next);
});

router.param('eventId', (req, res, next, eventId) => {
    Event.findById(eventId)
    .then(events => {
            req.foundEvent = events;
            next();
        })
    .then(null, next)
});