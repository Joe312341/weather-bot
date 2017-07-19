'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = exports.greetUser = undefined;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a welcome message
 * @param {string} username
 * @return {Object}
 */
/* global process */
var greetUser = exports.greetUser = function greetUser(username) {
  return {
    'messages': [{
      'type': 'text',
      'text': 'Hey ' + username + ', what\'s up?'
    }]
  };
};

/**
 * Retrieves the current weather for the address
 * @param {string} address
 * @return {Promise}
 */
var getWeather = exports.getWeather = function getWeather(address) {

  var gmapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + process.env.G_MAP_KEY;

  var locationName = void 0;

  return (0, _requestPromise2.default)(gmapUrl).then(function (gmapResponse) {

    var parsedBody = JSON.parse(gmapResponse);
    if (parsedBody.results.length === 0) {
      return Promise.reject('This location does not exist!');
    }

    var _parsedBody$results$ = parsedBody.results[0].geometry.location,
        lat = _parsedBody$results$.lat,
        lng = _parsedBody$results$.lng;

    locationName = parsedBody.results[0].address_components[0].long_name;
    var darkSkyUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + '/' + lat + ',' + lng;

    return (0, _requestPromise2.default)(darkSkyUrl);
  }).then(function (darkSkyResponse) {

    var parsedBody = JSON.parse(darkSkyResponse);

    var _parsedBody$currently = parsedBody.currently,
        summary = _parsedBody$currently.summary,
        temperature = _parsedBody$currently.temperature;


    var weatherResponse = { 'messages': [{
        'type': 'text',
        'text': 'It\'s ' + summary.toLowerCase() + ' and ' + parseInt(temperature) + ' degrees right now in ' + locationName
      }] };

    return weatherResponse;
  }).then(function (responseMessage) {
    return responseMessage;
  }).catch(function (err) {
    return (0, _helpers.createErrorMessage)(err);
  });
};