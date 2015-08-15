/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var IdeaModel = require('./idea.model.js');

var ideaRoutes = new RESTRouter(IdeaModel);
module.exports = ideaRoutes.generateRoutes();
