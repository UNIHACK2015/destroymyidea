'use strict';

angular.module('unihack2015App')
    .directive('ideaVoter', function (Idea, Auth) {
        return {
            templateUrl: 'app/directives/ideaVoter/ideaVoter.html',
            restrict: 'EA',
            scope: {
                'idea': '='
            },
            link: function (scope, element, attrs) {
                var ready = false;
                scope.voted = 0;
                scope.$watch(attrs.idea, function (idea) {
                    if (idea) {
                        if (Auth.isLoggedIn()) {

                            var ideas = Auth.getCurrentUser().votes.ideas;

                            var index = _.findIndex(ideas, function (check) {
                                return check.idea_id == idea._id;
                            });

                            if (index > -1) {
                                scope.voted = ideas[index].vote;
                            }
                        }


                    }

                }, false);


                scope.upvote = function () {
                    scope.idea.rating.destroy_it += scope.voted === -1 ? -1 : 0;

                    scope.voted = (scope.voted === 1) ? 0 : 1;
                    scope.idea.rating.back_it += (scope.voted === 1) ? 1 : -1;
                    Idea.vote({id: scope.idea._id}, {change: 1}, function (data) {
                        Auth.updateCurrentUser();
                    });
                };
                scope.downvote = function () {
                    scope.idea.rating.back_it += scope.voted === 1 ? -1 : 0;

                    scope.voted = (scope.voted === -1) ? 0 : -1;
                    scope.idea.rating.destroy_it += (scope.voted === -1) ? 1 : -1;
                    Idea.vote({id: scope.idea._id}, {change: -1}, function (data) {
                        Auth.updateCurrentUser();
                    });
                };
            }
        };
    });