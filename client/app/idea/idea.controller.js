'use strict';

angular.module('unihack2015App')
  .controller('IdeaCtrl', function ($scope, Comment) {
    $scope.idea = {};
    $scope.comments = Comment.query();
  });
