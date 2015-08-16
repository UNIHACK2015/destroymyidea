/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Idea = require('../api/idea/idea.model');

Thing.find({}).remove(function () {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            username: 'testuser',
            email: 'test@test.com',
            password: 'test',
            points: '500',
            badges: [{
                'id': '020',
                'name': 'The Destroyer of Ideas',
                short_desc: 'Destroy 10 ideas.',
                imgPath: '/assets/images/badges/ideas.png',
                achieved: true
            },
                {
                    'id': '030',
                    'name': 'The Destroyer of Dreams',
                    short_desc: 'Destroy 50 ideas.',
                    imgPath: '/assets/images/badges/dreams.png',
                    achieved: true
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Being',
                    short_desc: '[LOCKED] Destroy 100 ideas.',
                    imgPath: '/assets/images/badges/being.png'
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Worlds',
                    short_desc: '[LOCKED] Destroy 200 ideas.',
                    imgPath: '/assets/images/badges/worlds.png'
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Comprehension',
                    short_desc: '[LOCKED] Destroy 300 ideas',
                    imgPath: '/assets/images/badges/comprehension.png'
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Countiousness',
                    short_desc: '[LOCKED] Destroy 400 ideas.',
                    imgPath: '/assets/images/badges/countiousness.png'
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Universes',
                    short_desc: '[LOCKED] Destroy 500 ideas.',
                    imgPath: '/assets/images/badges/universes.png'
                },
                {
                    'id': '015',
                    'name': 'The Destroyer of Galaxies',
                    short_desc: '[LOCKED] Destroy 800 ideas.',
                    imgPath: '/assets/images/badges/galaxies.png'
                }]
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function () {
            console.log('finished populating users');
        }
    );
});

Idea.find({}).remove(function () {
    Idea.create({
            name: "SO, BASICALLY, IT'S LIKE A GREEN TECH PROGRAM FOR BEER!",
            description: "So, it would be power by solar panels and stuff. Y'know, whatever mann"
        }, {
            name: "We're Groupon for novels.",
            description: 'No explanation. Do your best to destroy it!'
        }, function () {
            console.log('finished populating users');
        }
    );
});
