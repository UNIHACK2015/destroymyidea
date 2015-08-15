/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var IdeaModel = require('./idea.model.js');
var auth = require('./../../auth/auth.service');
var _ = require('lodash');

var ideaRoutes = new RESTRouter(IdeaModel);
var routes = ideaRoutes.generateRoutes();

function handleError(res, err) {
    return res.status(500).send(err);
};

routes.put('/:id/vote', auth.isAuthenticated(), function (req, res) {
    IdeaModel.findById(req.params.id, function (err, idea) {
        if (err) {
            return handleError(res, err);
        }

        var foundCommentIndex = _.findIndex(req.user.votes.ideas, function(idea) {
            return idea.idea_id == req.params.id;
        });

        var newRating = 0;

        var backit = 0;
        var destroyit = 0;


        if(foundCommentIndex > -1) {
            // Updating existing vote
            var foundComment = req.user.votes.ideas[foundCommentIndex];

            if(foundComment.vote == 0) {
                if(req.body.change > 0) backit = 1;
                else destroyit = 1;
            } else if (foundComment.vote == 1) {
                backit = -1;
                destroyit = req.body.change == -1 ? 1 : 0;
            } else if (foundComment.vote == -1) {
                backit = req.body.change == 1 ? 1 : 0;;
                destroyit = -1;
            }
            req.user.votes.ideas[foundCommentIndex].vote = req.body.change == foundComment.vote ? 0 : req.body.change;
        } else {
            req.user.votes.ideas.push({
                idea_id: req.params.id,
                vote: req.body.change
            });
            if(req.body.change) backit += 1;
            else destroyit+=1;
        }
        req.user.save();

        idea.rating.back_it += backit;
        idea.rating.destroy_it += destroyit;


        idea.save(function (err, item) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(item);
        });
    });
});

module.exports = routes;