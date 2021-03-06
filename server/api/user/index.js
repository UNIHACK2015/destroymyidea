'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', controller.show);
router.get('/uname/:username', controller.getByUsername);
router.post('/', controller.create);

/**
 * Checks if a user has already voted on an idea or comment before
 */
router.post('/:id/voted', auth.isAuthenticated(), controller.hasVoted);

module.exports = router;
