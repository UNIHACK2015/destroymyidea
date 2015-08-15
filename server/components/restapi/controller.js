/**
 * Created by AlexRob on 15/08/15.
 */
'use strict';

module.exports = function (model) {
    var _ = require('lodash');
    var routes = {};

    routes.index = function(req, res) {
        model.find(function (err, items) {
            if(err) { return handleError(res, err); }
            return res.status(200).json(items);
        });
    };

    routes.show = function(req, res) {
        model.findById(req.params.id, function (err, item) {
            if (err) {
                return handleError(res, err);
            }
            if (!item) {
                return res.status(404).send('Not Found');
            }
            return res.json(item);
        });
    };

    routes.create = function(req, res) {
        model.create(req.body, function (err, item) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(201).json(item);
        });
    };

    routes.update = function(req, res) {
        if(req.body._id) { delete req.body._id; }
        model.findById(req.params.id, function (err, item) {
            if (err) { return handleError(res, err); }
            if(!item) { return res.status(404).send('Not Found'); }
            var updated = _.assign(item, req.body);
            updated.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.status(200).json(item);
            });
        });
    };

    routes.destroy = function(req, res) {
        model.findById(req.params.id, function (err, item) {
            if(err) { return handleError(res, err); }
            if(!item) { return res.status(404).send('Not Found'); }
            item.remove(function(err) {
                if(err) { return handleError(res, err); }
                return res.status(204).send('No Content');
            });
        });
    };

    function handleError (res, err) {
        return res.status(500).send(err);
    };

    return routes;
};
