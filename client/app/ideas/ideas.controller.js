'use strict';

angular.module('unihack2015App')
  .controller('IdeasCtrl', ['$scope', 'Idea', function ($scope, Idea) {
    var newest = [];
    var currPage = 0;

    $scope.ideas = Idea.loadData({pageId: currPage},function (items) {
      newest = items;
      $scope.ideas = items;
      currPage++;
      updateGrid();
    });

    $scope.updateList = function (newIdea) {
      $scope.ideas.unshift(newIdea);
      updateGrid();
    };

    $scope.searchText = '';

    function updateGrid() {
      console.log('running');
      $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
      });
    }

    $scope.search = function () {
      if ($scope.searchText == '') {
        $scope.ideas = newest;
        updateGrid();
      } else {
        Idea.search({title: $scope.searchText}, function (ideas) {
          $scope.ideas = ideas;
          updateGrid();
        });
      }

    };

    $scope.loadIdeas = function () {
      Idea.loadData({pageId: currPage}, function (items) {
        $scope.ideas = $scope.ideas.concat(items);
        currPage++;
        updateGrid();
      });
    };

  }]);
