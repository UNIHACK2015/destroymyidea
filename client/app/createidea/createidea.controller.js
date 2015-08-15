'use strict';

angular.module('unihack2015App')
    .controller('CreateideaCtrl', ['$scope', 'Idea', function ($scope, Idea) {
        $scope.message = 'Hello';

        $scope.idea = {};


        $scope.createIdea = function() {

            /* todo: validation */
            Idea.save($scope.idea, function (success) {
                console.log(success);
            });

        }

    }]);
