/* globals angular */
(function() {
  'use strict';

  //noinspection JSUnresolvedFunction
  angular.module('area')
    .service('areaService', ['$q', '$http', AreaService]);

  /**
   * Convert stock gov't image to pretty
   * Not all current conditions have a NWS image :(
   *
   * @param {string} nws National Weather Service icon
   * @returns {string}
   */
  function weatherImage(nws) {
    var path = 'assets/photo/';
    switch (nws) {
      case 'bkn.png':         //broken clouds
      case 'hi_shwrs20.png':  //20% showers
      case 'hi_shwrs40.png':  //40% showers
      case 'hi_nshwrs40.png': //night 40% showers
      case 'hi_nshwrs20.png': //night 20% showers
      case 'nbkn.png':        //night broken clouds
      case 'nra50.png':       //50% rain
      case 'nshra20.png':     //night 20% rain
      case 'nshra40.png':     //night 40% rain
      case 'nwind_bkn.png':   //night windy, broken clouds
      case 'ra50.png':        //50% rain
      case 'shra20.png':      //20% rain
      case 'shra40.png':      //40% rain
      case 'wind_bkn.png':    //windy, broken clouds
        return path + 'fluffy-white-clouds2.jpg';
      case 'few.png':         //few clouds
      case 'nfew.png':        //night few clouds
      case 'nsct.png':        //night scattered clouds
      case 'nwind_few.png':   //night windy, few clouds
      case 'wind_few.png':    //windy, few clouds
      case 'sct.png':         //scattered clouds
        return path + 'bright-sun2.jpg';
      case 'nra_sn40.png':    //night 40% snow
      case 'nra_sn.png':      //night snow
      case 'ra_sn.png':       //snow
      case 'ra_sn40.png':     //40% snow
        return path + 'field-of-dimpled-snow2.jpg';
      default:
        return path + 'tornado2.jpg';  // Means we must add a new, unknown NWS weather image
    }
  }

  /**
   * Area DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAllArea: Function}}
   * @constructor
   */
  function AreaService($q, $http) {
    var area = [];
    var cities = [
      {'name': 'Chicago, IL', 'lat': 41.84, 'lon': -87.68},
      {'name': 'Houston, TX', 'lat': 29.77, 'lon': -95.39},
      {'name': 'New York, NY', 'lat': 40.71, 'lon': -73.98},
      {'name': 'San Diego, CA', 'lat': 32.72, 'lon': -117.15},
      {'name': 'Seattle, WA', 'lat': 47.60, 'lon': -122.36}
    ];
    var idx = -1;
    var today = new Date().toLocaleDateString();
    var weather;
    var apiUrl =
    'http://forecast.weather.gov/MapClick.php?FcstType=json&callback=JSON_CALLBACK&lat=';

    while (++idx < cities.length) {
      area.push(
        {
          name: cities[idx].name,
          avatar: 'svg-' + (idx + 1),
          report: 'Fetching weather from server. One moment...',
          high: 0,
          humidity: 0,
          low: 0,
          temperature: 0,
          measureTime: today,
          wind: 0,
          weatherIcon: ''
        }
      );

      //noinspection JSUnresolvedFunction
      $http.jsonp(apiUrl + cities[idx].lat + '&lon=' + cities[idx].lon)
        .success(function(data) {
          var place = cities.length - 1;
          // console.dir(data);    //Use to get additional weather image info
          while (place > 0) {
            // Make less fragile! Requires City State Abbr in NOAA data to match exactly
            // In particular San Diego, CA (only) has ['location']['areaDescription'] as 'downtown CA'
            // This can be mitigated, by adding a 'closestStation' key to cities[]
            //noinspection JSUnresolvedVariable
            if (data.productionCenter === cities[place].name) {
              break;
            }
            --place;
          }
          area[place].high = data.data.temperature[1];
          //noinspection JSUnresolvedVariable
          area[place].humidity = data.currentobservation.Relh;
          area[place].low = data.data.temperature[0];
          //noinspection JSUnresolvedVariable
          area[place].measureTime = data.currentobservation.Date;
          area[place].report = data.data.text[0];
          //noinspection JSUnresolvedVariable
          area[place].temperature = data.currentobservation.Temp;
          //noinspection JSUnresolvedVariable
          area[place].wind = data.currentobservation.Wind;

          area[place].weatherImage = weatherImage(data.currentobservation.Weatherimage);
          //area[place].weatherImage = weatherImage(data.data.iconLink[0]);
        });
    }

    // Promise-based API
    return {
      loadAllArea: function() {
        // Simulate async nature of real remote calls
        return $q.when(area);
      }
    };
  }

})();
