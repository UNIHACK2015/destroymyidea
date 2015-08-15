'use strict';

angular.module('unihack2015App')
    .controller('IdeasCtrl', ['$scope', 'Idea', function ($scope, Idea) {
        var newest = [];

        $scope.ideas = Idea.query(function (items) {
            newest = items;
            $scope.ideas = items;
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

        }
    }]);
