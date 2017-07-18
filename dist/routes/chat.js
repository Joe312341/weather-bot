'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _commands = require('../commands');

var _commands2 = _interopRequireDefault(_commands);

var _apiMethods = require('../apiMethods');

var _helpers = require('../helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)();
var chatRouter = _express2.default.Router();

chatRouter.post('/messages', upload.single(), function (req, res) {
  var userRequest = req.body;

  switch (userRequest.action) {
    case 'join':
      {
        var response = (0, _apiMethods.greetUser)(userRequest.name);
        res.json(response);
        break;
      }
    case 'message':
      {
        var address = (0, _commands2.default)(userRequest.text);
        // no address could be extracted
        if (address === '') {
          // return new Error('No address found');
          var errorMessage = (0, _helpers.createErrorMessage)('No address found');
          res.json(errorMessage);
        }
        (0, _apiMethods.getWeather)(address).then(function (result) {
          res.json(result);
        });
        break;
      }
    default:
      res.send(403);
  }
});

exports.default = chatRouter;