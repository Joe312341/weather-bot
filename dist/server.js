'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _chat = require('./routes/chat.js');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global process*/
var app = (0, _express2.default)();
var port = process.env.PORT || 9000;

// to read post params
app.use(_bodyParser2.default.json());

// logging
app.use((0, _morgan2.default)('combined'));

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routing
app.use('/chat', _chat2.default);

app.listen(port, function () {
  console.log('Listening on port ' + port + '!'); // eslint-disable-line
});