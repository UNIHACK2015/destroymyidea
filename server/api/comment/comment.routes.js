/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var CommentModel = require('./comment.model.js');

var commentRoutes = new RESTRouter(CommentModel.model);

module.exports = commentRoutes.generateRoutes();
