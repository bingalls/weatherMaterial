/* global $scope, angular, ContactPanelController */
/*eslint-env browser */
(function() {
  'use strict';

  //noinspection JSUnresolvedFunction
  angular
    .module('area')
    .controller('AreaController', [
      'areaService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
      AreaController
    ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param areaService $scope
   * @param $mdSidenav
   * @param $mdBottomSheet avatarsService
   * @param $log
   * @param $q
   * @constructor
   */
  function AreaController(areaService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected = null;
    self.area = [];
    self.selectArea = selectArea;
    self.toggleList = toggleAreaList;
    self.showAreaDetails = showAreaDetails;

    // Load all registered area

    areaService
      .loadAllArea()
      .then(function(area) {
        self.area = [].concat(area);
        self.selected = area[0];
      });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleAreaList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function() {
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param area menuId
     */
    function selectArea(area) {
      self.selected = angular.isNumber(area) ? $scope.area[area] : area;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     * @param $event
     * @returns {promise}
     */
    function showAreaDetails($event) {
      // var area = self.selected; // unused

      return $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: '/view/areaDetails.html',
        controller: ['$mdBottomSheet', ContactPanelController],
        controllerAs: 'cp',
        bindToController: true,
        targetEvent: $event
      }).then(function(clickedItem) {
        return clickedItem && $log.debug(clickedItem.name + ' clicked!');
      });
    }

  }

})();
