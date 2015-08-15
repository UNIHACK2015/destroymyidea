'use strict';

angular.module('unihack2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ideas', {
        url: '/ideas',
        templateUrl: 'app/ideas/ideas.html',
        controller: 'IdeasCtrl'
      });
  });