/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

var IdeaRoutes = require('./api/idea/idea.routes.js');
var CommentRoutes = require('./api/comment/comment.routes.js');
var BadgeRoutes = require('./api/badge/badge.routes.js');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));


  app.use('/auth', require('./auth'));

  app.use('/ideas', IdeaRoutes);
  app.use('/comments', CommentRoutes);
  app.use('/badges', BadgeRoutes);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
