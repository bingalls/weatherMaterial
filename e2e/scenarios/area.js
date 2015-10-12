/* globals beforeEach, describe, expect, it, require, toBeGreaterThan */

var AreaList    = require('../pages/AreaList.js');
var AreaDetails = require('../pages/AreaDetails.js');

describe('my app', function() {
  'use strict';
  var areas   = new AreaList();
  var details = new AreaDetails();

  beforeEach(function() {
    areas.loadAll();
  });

  it('should load a list of areas', function() {
    //noinspection JSUnresolvedFunction
    expect(areas.count()).toBeGreaterThan(1);
  });

  describe('selecting a user', function() {

    beforeEach(function() {
      return details.areaDetails();
    });
  });
});
