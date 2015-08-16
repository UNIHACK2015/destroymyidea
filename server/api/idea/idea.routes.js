/**
 * Created by AlexRob on 15/08/15.
 */

var RESTRouter = require('./../../components/restapi/routes.js');
var IdeaModel = require('./idea.model.js');
var auth = require('./../../auth/auth.service');
var _ = require('lodash');
var User = require('../user/user.controller.js');

var ideaRoutes = new RESTRouter(IdeaModel);
var routes = ideaRoutes.generateRoutes({index: false, show: false});

function handleError(res, err) {
    return res.status(500).send(err);
};

routes.get('/search', function (req, res) {
    var searchConfig = {};
    if (req.query.title) {
        searchConfig.name = new RegExp(req.query.title, "i");
    }
    if (req.query.user_id) {
        searchConfig.user_id = new RegExp(req.query.user_id, "i");
    }

    IdeaModel.find(searchConfig, function (err, ideas) {
        if (err) handleError(res, err);
        res.status(200).json(ideas || []);
    });
});

var pager = require('../../components/restapi/pager');

routes.get('/', function (req, res) {
    searchConfig = {};
    if (req.query.title) {
        searchConfig.name = new RegExp(req.query.title, "i");
    }
    if (req.query.user_id) {
        searchConfig.user_id = new RegExp(req.query.user_id, "i");
    }
    var query = IdeaModel.find(searchConfig);
    if (req.query.sort) {
        console.log('sorting');
        var sort = {};
        switch (req.query.sort) {
            case 'best':
                sort['rating.back_it'] = -1;
                break;
            case 'worst':
                sort['rating.destroy_it'] = -1;
                break;
            case 'new':
            default:
                sort.timestamp = -1;

        }
        query = query.sort(sort);
    } else {
        console.log('not sorting');
    }
    query = pager(req, query);

    query.exec(function (err, items) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(items);
    });
});

routes.get('/:id', function (req, res) {
    IdeaModel.findById(req.params.id).populate('user_id comments comments.replies.user_id')
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

routes.put('/:id/vote', auth.isAuthenticated(), function (req, res) {
    IdeaModel.findById(req.params.id, function (err, idea) {
        if (err) {
            return handleError(res, err);
        }

        var foundCommentIndex = _.findIndex(req.user.votes.ideas, function (idea) {
            return idea.idea_id == req.params.id;
        });

        var newRating = 0;

        var backit = 0;
        var destroyit = 0;


        if (foundCommentIndex > -1) {
            // Updating existing vote
            var foundComment = req.user.votes.ideas[foundCommentIndex];

            if (foundComment.vote == 0) {
                /* Comment had no original vote */
                if (req.body.change > 0) backit = 1;
                else destroyit = 1;
            } else if (req.body.change == 1) {
                /* User has selected upvote */
                backit = foundComment.vote == 1 ? -1 : 1;
                destroyit = foundComment.vote == -1 ? -1 : 0;
            } else if (req.body.change == -1) {
                /* User has selected downvote */
                backit = foundComment.vote == 1 ? -1 : 0;
                destroyit = foundComment.vote == -1 ? -1 : 1;
            }
            req.user.votes.ideas[foundCommentIndex].vote = req.body.change == foundComment.vote ? 0 : req.body.change;
        } else {
            req.user.votes.ideas.push({
                idea_id: req.params.id,
                vote: req.body.change
            });
            if (req.body.change === 1) {
                backit += 1;
            } else if (req.body.change === -1) {
                destroyit += 1;
            }
        }
        req.user.save();

        console.log('back it ' + backit);
        console.log('destroy it ' + destroyit);

        idea.rating.back_it += backit;
        idea.rating.destroy_it += destroyit;
        console.log(req.body);


        idea.save(function (err, item) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(item);
        });
    });
});

routes.put('/:ideaId/comments/:commentId/vote', auth.isAuthenticated(), function (req, res) {
    IdeaModel.findById(req.params.ideaId, function (err, idea) {
        var change = req.body.change;

        var backit = 0;
        var destroyit = 0;

        if (err) {
            return handleError(res, err);
        }

        // find comment
        var foundCommentIndex = _.findIndex(req.user.votes.comments, function (comment) {
            return comment.comment_id == req.params.commentId;
        });

        if (foundCommentIndex >= 0) {
            console.log('index: ' + foundCommentIndex);
            var comment = req.user.votes.comments[foundCommentIndex];

            // Updating existing vote
            if (comment.vote == 0) {
                if (change > 0) backit = 1;
                else destroyit = 1;
            } else if (comment.vote == 1) {
                backit = -1;
                destroyit = change == -1 ? 1 : 0;
            } else if (comment.vote == -1) {
                backit = change == 1 ? 1 : 0;
                destroyit = -1;
            }
            req.user.votes.comments[foundCommentIndex].vote = (change == comment.vote) ? 0 : change;
        } else {
            req.user.votes.comments.push({
                comment_id: req.params.commentId,
                vote: change
            });
            if (change) backit += 1;
            else destroyit += 1;
        }
        req.user.save();

        var ideaCommIndex = _.findIndex(idea.comments, function (comments) {
            return comments._id == req.params.commentId;
        });

        if (idea.comments[ideaCommIndex]) {
            idea.comments[ideaCommIndex].rating.upvotes += backit;
            idea.comments[ideaCommIndex].rating.downvotes += destroyit;
        }

        idea.save(function (err, item) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(item);
        });
    });
});

module.exports = routes;
