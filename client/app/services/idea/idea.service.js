'use strict';

angular.module('unihack2015App')
  .service('Idea', ['$resource', function ($resource) {

        return $resource('/api/ideas');

  }]);
