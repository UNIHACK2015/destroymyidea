'use strict';

angular.module('unihack2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('idea', {
        url: '/ideas/:id',
        templateUrl: 'app/idea/idea.html',
        controller: 'IdeaCtrl'
      });
  });
