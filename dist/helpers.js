'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createErrorMessage = exports.createErrorMessage = function createErrorMessage(text) {
  return {
    'messages': [{
      'type': 'text',
      'text': text
    }]
  };
};