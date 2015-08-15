'use strict';

angular.module('unihack2015App')
    .controller('IdeasCtrl', ['$scope', 'Idea', function ($scope, Idea) {
        var newest = [];

        $scope.ideas = Idea.query(function (items) {
            newest = items;
        });

        $scope.updateList = function (newIdea) {
            $scope.ideas.unshift(newIdea);
        };

        $scope.searchText = '';

        $scope.search = function () {
            if ($scope.searchText == '') {
                $scope.ideas = newest;
            } else {
                console.log('searching');
                Idea.search({title: $scope.searchText}, function (ideas) {
                    $scope.ideas = ideas;
                });
            }

        }
    }]);
