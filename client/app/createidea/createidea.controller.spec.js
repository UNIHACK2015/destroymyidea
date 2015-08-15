'use strict';

describe('Controller: CreateideaCtrl', function () {

  // load the controller's module
  beforeEach(module('unihack2015App'));

  var CreateideaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateideaCtrl = $controller('CreateideaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
