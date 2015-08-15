/**
 * Created by AlexRob on 15/08/15.
 */

'use strict';

var express = require('express');
var RESTController = require('./controller.js');

module.exports = function(model) {
    var restRouter = {};
    var router = express.Router();
    var controller = new RESTController(model);

    restRouter.generateRoutes = function(config) {
        config = config || {};
        if(config.index !== false) router.get('/', controller.index);
        if(config.show !== false) router.get('/:id', controller.show);
        if(config.update !== false) router.put('/:id', controller.update);
        if(config.create !== false) router.post('/', controller.create);
        if(config.destroy !== false) router.delete(':id/', controller.destroy);
        return router;
    };

    return restRouter;
};
