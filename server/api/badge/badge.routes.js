/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var BadgeModel = require('./badge.model.js');

var badgeRoutes = new RESTRouter(BadgeModel);
module.exports = badgeRoutes.generateRoutes();
