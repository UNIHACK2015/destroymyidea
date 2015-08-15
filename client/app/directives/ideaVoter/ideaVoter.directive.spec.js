'use strict';

describe('Directive: ideaVoter', function () {

  // load the directive's module and view
  beforeEach(module('unihack2015App'));
  beforeEach(module('app/directives/ideaVoter/ideaVoter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<idea-voter></idea-voter>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ideaVoter directive');
  }));
});