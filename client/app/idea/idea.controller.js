'use strict';

angular.module('unihack2015App')
  .controller('IdeaCtrl', function ($scope, Idea, $state, Auth, Comment) {
    $scope.comment = '';

    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.refreshIdea = function() {
      $scope.idea = Idea.get({id: $state.params.id});
    };

    $scope.postComment = function () {
      if ($scope.comment && Auth.isLoggedIn()) {
        var temp = $scope.idea;
        temp.comments.push({
          user_id: Auth.getCurrentUser()._id,
          criticism: $scope.comment
        });
        Idea.update({id: $state.params.id}, temp);
        $scope.refreshIdea();
      }
    };

    $scope.refreshIdea();
  });
