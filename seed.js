/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Partner = Promise.promisifyAll(mongoose.model('Partner'));


var seedUsers = function () {

    var users = [
        {
            email: 'Beckylee@email',
            name: 'Beckylee',
            password: 'password'
        },
        {
            email: 'Laura@email',
            name:'Laura',
            password: 'password'
        }
    ];

    return User.createAsync(users);

};

var seedPartners = function() {
    var partners = [
        {
            name: 'EatWith',
            logo: 'http://nomprofits.weebly.com/uploads/5/8/1/8/58188119/2279676_orig.jpg',
            about: 'EatWith is a global community that lets you enjoy authentic and intimate dining experiences in people\'s homes.',
            url: 'http://www.eatwith.com/'
        },
        {
            name: 'Orbital NYC',
            about: 'Orbital is a space to do awesome stuff.',
            logo: 'http://nomprofits.weebly.com/uploads/5/8/1/8/58188119/5140460.jpg?161',
            url: 'http://www.orbitalnyc.com/'
        }
    ];

    return Partner.createAsync(partners);
};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers()
                .then(seedPartners);
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
