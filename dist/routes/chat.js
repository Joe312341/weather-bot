'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)();
// const express = require('express');


var chatRouter = _express2.default.Router();

chatRouter.post('/messages', upload.single(), function (req, res) {
  var user = req.body;
  var username = user.name;
  if (user.action === 'join') {
    var jsonResponse = {
      'messages': [{
        'type': 'text',
        'text': 'Hey ' + username + ', what\'s up?'
      }]
    };
    res.json(jsonResponse);
  }
});

exports.default = chatRouter;