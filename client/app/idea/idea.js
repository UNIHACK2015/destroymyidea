'use strict';

angular.module('unihack2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('idea', {
        url: '/idea',
        templateUrl: 'app/idea/idea.html',
        controller: 'IdeaCtrl'
      });
  });
