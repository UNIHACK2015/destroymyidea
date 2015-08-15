'use strict';

describe('Service: idea', function () {

  // load the service's module
  beforeEach(module('unihack2015App'));

  // instantiate service
  var idea;
  beforeEach(inject(function (_idea_) {
    idea = _idea_;
  }));

  it('should do something', function () {
    expect(!!idea).toBe(true);
  });

});
