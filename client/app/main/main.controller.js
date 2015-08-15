'use strict';

angular.module('unihack2015App')
    .controller('MainCtrl', function ($scope, $http, $state, Idea) {

        $scope.newIdea = '';
        $scope.createState = 'creating';
        $scope.errors = [];
        var createdIdea = null;

        $scope.createIdea = function (newIdea) {
            $scope.errors = [];
            if (newIdea.trim() == '') {
                console.log(newIdea);

                $scope.errors = ["You didn't provide an idea!"];
            } else {
                Idea.save({name: newIdea}, function (item) {
                    $scope.createState = 'created';
                    createdIdea = item;
                });
            }
        };

        $scope.goToNew = function () {
            console.log('going to new');
            $state.go('idea', {id: createdIdea._id});
        }
    });
