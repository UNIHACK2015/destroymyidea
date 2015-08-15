'use strict';

angular.module('unihack2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createidea', {
        url: '/ideas/create',
        templateUrl: 'app/createidea/createidea.html',
        controller: 'CreateideaCtrl'
      });
  });