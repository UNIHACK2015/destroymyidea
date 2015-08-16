'use strict';

angular.module('unihack2015App')
    .controller('IdeasCtrl', ['$scope', 'Idea', '$stateParams', function ($scope, Idea, $stateParams) {
        var newest = [];
        var currPage = 0;


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

        $scope.updateList = function (newIdea) {
            $scope.ideas.unshift(newIdea);
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
                });
            }
        };

        $scope.sort = function (method) {
            Idea.query({sort: method}, function (ideas) {
                $scope.ideas = ideas;
            });
        };

        $scope.ideas = [];

        $scope.loadData = function () {
            Idea.query({page: currPage}, function (ideas) {
                console.log(ideas);
                $scope.ideas = $scope.ideas.concat(ideas);
                currPage++;
            });
        };

        /**
         * If search term exists from main page
         */
        if ($stateParams.title) {
            $scope.searchText = $stateParams.title;
            $scope.search();
        }

    }]);
