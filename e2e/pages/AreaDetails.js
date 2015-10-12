/* globals $, browser, module */
var AreaDetails = function() {
  'use strict';
  //noinspection JSUnusedGlobalSymbols
  this.load = function() { browser.get('/#'); };

  //noinspection JSUnusedGlobalSymbols
  this.areaDetails = function() {
    $('button.contact').click();
  };

};

module.exports = AreaDetails;

