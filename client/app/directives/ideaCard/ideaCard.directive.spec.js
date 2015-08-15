'use strict';

describe('Directive: ideaCard', function () {

  // load the directive's module and view
  beforeEach(module('unihack2015App'));
  beforeEach(module('app/directives/ideaCard/ideaCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<idea-card></idea-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ideaCard directive');
  }));
});