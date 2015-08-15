'use strict';

angular.module('unihack2015App')
  .controller('IdeaCtrl', function ($scope, Idea, $state, Auth) {
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
      $scope.idea.comments.forEach(function (comment, i) {
        if (comment._id == commentId) {
          for(var j=0; j<user.votes.comments.length; j++) {
            if(user.votes.comments[j].comment_id == commentId) {
              var cmt = user.votes.comments[j];
              break;
            }
          }

          (cmt.vote == 1) ? $scope.idea.comments[i].rating.upvotes-- : $scope.idea.comments[i].rating.upvotes++;
          if (cmt.vote == -1) {
            $scope.idea.comments[i].rating.downvotes--;
          }
          (cmt.vote == 1) ? cmt.vote-- : cmt.vote = 1;
        }
      });
      Idea.commentVote({ideaId: $state.params.id, commentId: commentId}, {change: 1});
    };

    $scope.downvoteComment = function (commentId) {
      var user = Auth.getCurrentUser();
      $scope.idea.comments.forEach(function (comment, i) {
        if (comment._id == commentId) {
          for(var j=0; j<user.votes.comments.length; j++) {
            if(user.votes.comments[j].comment_id == commentId) {
              var cmt = user.votes.comments[j];
              break;
            }
          }

          (cmt.vote == -1) ? $scope.idea.comments[i].rating.downvotes-- : $scope.idea.comments[i].rating.downvotes++;
          if (cmt.vote == 1) {
            $scope.idea.comments[i].rating.upvotes--;
          }
          (cmt.vote == -1) ? cmt.vote++ : cmt.vote = -1;
        }
      });
      Idea.commentVote({ideaId: $state.params.id, commentId: commentId}, {change: -1});
    };

    $scope.refreshIdea();
  });
