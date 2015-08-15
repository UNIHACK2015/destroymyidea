'use strict';

angular.module('unihack2015App')
  .directive('ideaCard', function (Idea) {
    return {
      templateUrl: 'app/directives/ideaCard/ideaCard.html',
      restrict: 'EA',
      scope: {
        'idea': '='
      },
      link: function (scope, element, attrs) {

        scope.upvote = function () {Idea.vote({id: scope.idea._id}, {change: 1})};
        scope.downvote = function () {Idea.vote({id: scope.idea._id}, {change: -1})};
      }
    };
  });