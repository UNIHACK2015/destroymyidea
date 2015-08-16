'use strict';

angular.module('unihack2015App')
    .directive('simpleIdea', function (Idea, Auth) {
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


                    var toSubmit = scope.newIdea;
                    toSubmit.user_id = Auth.getCurrentUser()._id;

                    Idea.save(toSubmit, function (success) {
                        scope.status = 'success';
                        scope.successes = ['Thanks for your idea! Get ready to have it destroyed >:D'];
                        scope.update({'newIdea': success});
                    });
                }
            }
        };
    });