'use strict';

angular.module('unihack2015App')
    .service('Idea', ['$resource', function ($resource) {
        return $resource('/api/ideas/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            vote: {
                method: 'PUT',
                url: '/api/ideas/:id/vote'
            },
            search: {
                method: 'GET',
                url: '/api/ideas/search',
                isArray: true
            }
        });

    }]);
