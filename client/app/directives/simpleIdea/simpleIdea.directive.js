'use strict';

angular.module('unihack2015App')
    .directive('simpleIdea', function (Idea) {
        return {
            templateUrl: 'app/directives/simpleIdea/simpleIdea.html',
            restrict: 'EA',
            scope: {
                'update': '&onCreate'
            },
            link: function (scope, element, attrs) {
                scope.successes = [];
                scope.errors = [];
                scope.status = 'creating';
                scope.newIdea = {
                    name: ''
                };
                scope.createIdea = function () {
                    scope.errors = [];
                    scope.successes = [];

                    if (!scope.newIdea.name.length) {
                        scope.errors = ['You must provide your idea!'];
                        return;
                    }
                    Idea.save(scope.newIdea, function (success) {
                        scope.status = 'success';
                        console.log(scope);
                        scope.successes = ['Thanks for your idea! Get ready to have it destroyed >:D']
                        console.log(success);
                        scope.update({'newIdea': success});
                    });
                }
            }
        };
    });