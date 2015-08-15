'use strict';

angular.module('unihack2015App')
  .controller('IdeaCtrl', function ($scope, Idea, $state, Auth, User) {
    $scope.comment = '';

    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.refreshIdea = function () {
      $scope.idea = Idea.get({id: $state.params.id});
    };

    $scope.postComment = function () {
      if ($scope.comment) {
        var temp = $scope.idea;
        temp.comments.push({
          user_id: Auth.getCurrentUser()._id,
          criticism: $scope.comment
        });
        Idea.update({id: $state.params.id}, temp);
        $scope.refreshIdea();
      }
    };

    $scope.upvoteComment = function (commentId) {
      var user = Auth.getCurrentUser();
      var res = User.hasVoted({id: user._id}, {obj_id: commentId});
      if (!res.voted) {
        // add upvote
        $scope.idea.comments.forEach(function (comment, i) {
          if (comment._id == commentId) {
            $scope.idea.comments[i].rating.upvotes++;
            Idea.update({id: $state.params.id}, $scope.idea);
          }
        });
        // add comment to user's voted list
      }
    };

    $scope.downvoteComment = function (commentId) {
      var user = Auth.getCurrentUser();
      var res = User.hasVoted({id: user._id}, {obj_id: commentId});
      if (!res.voted) {
        // add upvote
        $scope.idea.comments.forEach(function (comment, i) {
          if (comment._id == commentId) {
            $scope.idea.comments[i].rating.downvotes++;
            Idea.update({id: $state.params.id}, $scope.idea);
          }
        });
        // add comment to user's voted list
      }
    };

    $scope.refreshIdea();
  });
