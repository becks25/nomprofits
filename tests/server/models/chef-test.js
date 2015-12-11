var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Chef = mongoose.model('Chef');

describe('Chef model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Chef).to.be.a('function');
    });

    describe('chef creation', function() {
        var createChef = function () {
                return Chef.create({ name: 'Little John', about: 'Cant swim' });
            };

        it('should exist after creation', function(){
            createChef().then(function(chef) {
                expect(chef).to.exist;
                expect(chef.name).to.be.equal('Little John');
                done();
            })
        });
    });

});
