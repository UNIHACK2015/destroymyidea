'use strict';

describe('Service: comments', function () {

  // load the service's module
  beforeEach(module('unihack2015App'));

  // instantiate service
  var comments;
  beforeEach(inject(function (_comments_) {
    comments = _comments_;
  }));

  it('should do something', function () {
    expect(!!comments).toBe(true);
  });

});
