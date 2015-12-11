var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Event = mongoose.model('Event');
var Chef = mongoose.model('Chef');

describe('Event model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Event).to.be.a('function');
    });

    describe('Event creation', function() {
        var createEvent = function () {
                return Event.create({ title: 'Delicious dinner', about: 'what a great event!' });
            };

        var chefId;

        var createEventChef = function(){
            return Chef.create({name: 'Robin'})
                .then(function(chef){
                    chefId = chef._id;
                    return Event.create({title: 'A great meal', chefs: [chef._id]});
                })
        };

        it('should exist after creation', function(){
            createEvent().then(function(event) {
                expect(event).to.exist;
                expect(event.name).to.be.equal('Delicious dinner');
                done();
            })
        });

        it('should reference a chef successfully', function(){
            createEventChef().then(function(ev) {
                expect(ev.chefs[0]).to.equal(chefId);
                done();
            });
        });
    });

});
