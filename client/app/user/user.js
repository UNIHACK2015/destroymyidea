'use strict';

angular.module('unihack2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/uname/:userid',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });