'use strict';

angular.module('unihack2015App')
  .service('Comment', function ($resource) {
    return $resource('/api/comments/:id', {
      id: '@_id'
    });

  });
