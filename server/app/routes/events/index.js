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
router.get('/', ensureAuthenticated, (req, res, next) => {
    Event.find().exec()
        .then(events => res.status(200).send(events))
        .then(null, next);
});

//get one
router.get('/:eventId', ensureAuthenticated, (req,res,next) => {
     res.send(req.foundEvent);

});

//create a new Event
router.post('/', ensureAuthenticated, (req, res, next) => {
    console.log('creating event', req.body);
    if(!req.body.chefs) req.body.chefs = [];
    req.body.chefsId.forEach(chef => {
        req.body.chefs.push(chef);
    });

    console.log('after', req.body.chefs);
    Event.create(req.body)
        .then(function(newEvent){
            console.log('created this: ', newEvent);
            res.status(201).send(newEvent);
        })
        .then(null, next); 
});

//edit existing Event
router.put('/:eventId', ensureAuthenticated, (req, res, next) => {
    _.assign(req.foundEvent, req.body);

    if(!req.foundEvent.chefs) req.foundEvent.chefs = [];
    req.body.chefsId.forEach(chef => {
        req.foundEvent.chefs.push(chef);
    });

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