/* globals browser, by, element, module */
var AreaList = function() {
  'use strict';
  this.loadAll = function() {
    browser.get('/#');
  };

  this.count = function() {
    return element.all(by.css('md-list-item')).count();
  };
};

module.exports = AreaList;

