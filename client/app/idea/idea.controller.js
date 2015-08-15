'use strict';

angular.module('unihack2015App')
  .controller('IdeaCtrl', function ($scope, Idea, $state, Auth) {
    Idea.get();
    $scope.idea = Idea.get({id: $state.params.id});
    $scope.comment = '';

    $scope.postComment = function () {
        if($scope.comment && Auth.isLoggedIn()) {
          $scope.idea.comments.push({
            user_id: Auth.getCurrentUser()._id,
            criticism: $scope.comment
          });
          Idea.update({id: $state.params.id}, $scope.idea);
        }
    }
  });
