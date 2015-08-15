/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var IdeaModel = require('./idea.model.js');
var _ = require('lodash');

var ideaRoutes = new RESTRouter(IdeaModel);
var routes = ideaRoutes.generateRoutes({index: false, show: false});

routes.get('/', function (req, res) {
  IdeaModel.find().populate('user_id comments').populate('comments.user_id', 'username')
    .exec(function (err, items) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(items);
    });
});

routes.get('/:id', function (req, res) {
  IdeaModel.findById(req.params.id).populate('user_id comments')
    .populate('comments.user_id', 'username').exec(function (err, item) {
      if (err) {
        return handleError(res, err);
      }
      if (!item) {
        return res.status(404).send('Not Found');
      }
      return res.json(item);
    });
});

module.exports = routes;
