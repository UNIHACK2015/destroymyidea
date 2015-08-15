'use strict';

angular.module('unihack2015App')
  .controller('IdeasCtrl', ['$scope', 'Idea', function ($scope, Idea) {
    $scope.ideas = Idea.query();

    $scope.updateList = function (newIdea) {
      $scope.ideas.unshift(newIdea);
    }
  }]);
