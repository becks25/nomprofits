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
var Chef = Promise.promisifyAll(mongoose.model('Chef'));


var seedUsers = function () {

    var users = [
        {
            email: 'Beckylee@email',
            name: 'Beckylee',
            password: 'password',
            isSuperAdmin: true
        },
        {
            email: 'Laura@email',
            name:'Laura',
            password: 'password',
            isSuperAdmin: true
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

var seedChefs = function() {
    var chefs = [
        {
            name:'Isabelle Nguyen',
            image:'http://nomprofits.weebly.com/uploads/5/8/1/8/58188119/5509563.png?194',
            about: ' is no stranger to the kitchen. She has been cooking since she was 5,  preparing multi-course meals for her family at the age of 10, and catering for birthday parties and private events since her teens. After moving from Texas to NYC, she continued to cook, incorporating bold flavors from her Southern and Vietnamese roots. In 2013, Chef Isabelle decided to immersed herself in the culinary world by working at some of the top rated restaurants in New York City to continue to refine her skills. In 2014, she launched The Art of Pho as a conceptual culinary pop up focusing on her mother\'s beloved pho recipe, fine tuning it to make it more healthful. The result is a stunning clear broth that is intensively flavorful due to 16 hours of patient simmering. She has sold out all 3 seatings of the Art of Pho. She aims to continue to introduce New Yorkers of all stripes to her modern-style Vietnamese cuisine. '
        },
        {
            name: 'Angelina Lopez',
            image: 'http://nomprofits.weebly.com/uploads/5/8/1/8/58188119/1439756452.png',
            about: ' works in education innovation by day, and is a baker and pastry chef by night. She comes from a long line of dessert-makers; her parents own and run a bakery that thrills the taste buds of Floridians. She loves pulling together unique flavor combinations and making desserts that are visually stunning in addition to being delicious. Angelina has designed and prepared pastry displays for weddings, and aims to one-day stage a pop-up showcasing her creations at a surprise venue near you (look out for it!). '
        }
    ];

    return Chef.createAsync(chefs);
};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers()
                .then(seedPartners)
                .then(seedChefs);
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
