'use strict';

angular.module('unihack2015App')
    .controller('CreateideaCtrl', ['$scope', 'Idea', function ($scope, Idea) {
        $scope.message = 'Hello';

        $scope.idea = {};


        $scope.createIdea = function () {

            /* todo: validation */
            Idea.save($scope.idea, function (success) {
                console.log(success);
            });

        };

        $scope.newUrl = '';

        $scope.addUrl = function () {

            if (!$scope.idea.images.length) {
                $scope.idea.images.push('');
            } else if ($scope.idea.images.length) {
                if ($scope.idea.images[$scope.idea.images.length - 1].length > 0) {
                    $scope.idea.images.push('');
                } else {
                    console.log($scope.idea.images[$scope.idea.images.length - 1]);
                }
            }

        }

        $scope.deleteUrl = function (node) {
            node.parentNode.parentNode.removeChild(node.parentNode);
        }
    }]);
