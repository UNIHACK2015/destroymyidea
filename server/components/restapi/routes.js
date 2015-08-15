/**
 * Created by AlexRob on 15/08/15.
 */

'use strict';

var express = require('express');
var RESTController = require('./controller.js');


module.exports =  class RESTRoutes {

    constructor(model) {
        this.router = express.Router();
        this.model = model;
        this.controller = new RESTController(model);
    }

    generateRoutes(config) {
        config = config || {};
        if(config.index !== false) this.router.get('/', this.controller.index);
        if(config.show !== false) this.router.get('/:id', this.controller.show);
        if(config.update !== false) this.router.put('/:id', this.controller.update);
        if(config.create !== false) this.router.post('/', this.controller.create);
        if(config.destroy !== false) this.router.delete(':id/', this.controller.destroy);
        return this.router;
    }
};