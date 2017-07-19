'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts text to a Object sendable with res.json()
 * Currently only supports a single message
 * @param {string} text
 * @return {Object}
 */
var createErrorMessage = exports.createErrorMessage = function createErrorMessage(text) {
  return {
    'messages': [{
      'type': 'text',
      'text': text
    }]
  };
};