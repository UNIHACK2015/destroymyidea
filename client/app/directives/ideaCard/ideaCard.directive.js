'use strict';

angular.module('unihack2015App')
  .directive('ideaCard', function (Idea) {
    return {
      templateUrl: 'app/directives/ideaCard/ideaCard.html',
      restrict: 'EA',
      scope: {
        'idea': '='
      },
      link: function (scope, element, attrs) {


      }
    };
  });