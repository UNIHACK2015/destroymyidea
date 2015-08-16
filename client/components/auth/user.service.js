'use strict';

angular.module('unihack2015App')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method: 'PUT'
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getByUName: {
        method: 'GET',
        url: '/api/users/uname/:username'
      },
      hasVoted: {
        method: 'POST',
        params: {
          controller: 'voted'
        }
      }
	  });
  });
