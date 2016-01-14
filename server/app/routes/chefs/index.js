'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Chef = mongoose.model('Chef');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//get all Chefs
router.get('/', ensureAuthenticated, (req, res, next) => {
    Chef.find().exec()
        .then(chef => res.status(200).send(chef))
        .then(null, next);
});

//get one
router.get('/:chefId', ensureAuthenticated, (req,res,next) => {
     res.send(req.foundChef);

});

//create a new Chef
router.post('/', ensureAuthenticated, (req, res, next) => {
    Chef.create(req.body)
        .then(function(newChef){
            res.status(201).send(newChef);
        })
        .then(null, next); 
});

//edit existing Chef
router.put('/:chefId', ensureAuthenticated, (req, res, next) => {
    _.assign(req.foundChef, req.body);
    req.foundChef.save()
        .then(chef => res.status(200).send(chef))
        .then(null, next);
});

router.delete('/:chefId', ensureAuthenticated, (req, res, next) => {
    Chef.remove({_id: req.foundChef._id}).exec()
        .then(removed => res.status(200).send(removed))
        .then(null, next);
});

router.param('chefId', (req, res, next, chefId) => {
    Chef.findById(chefId)
    .then(chef => {
            req.foundChef = chef;
            next();
        })
    .then(null, next)
});