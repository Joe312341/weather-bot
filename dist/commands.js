'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checks if commands are part of the message and acts accordingly
 * Although "what's the weather in" is not necessary in this case it is
 * added for completeness purpose and with the intent to improve this
 * methodology in the future (i.e. created some extract engine)
 * @param {string} message
 * @param {string} command
 * @param {boolean} locationInFront
 * @return {string}
 */
var returnAddress = function returnAddress(message) {
  var commands = ['what\'s the weather in', 'weather in', 'weather'];
  if (message.includes(commands[0])) {
    return extractAddress(message, commands[0]);
  } else if (message.includes(commands[1])) {
    return extractAddress(message, commands[1]);
  } else if (message.includes(commands[2])) {
    return extractAddress(message, commands[2], true);
  } else {
    return '';
  }
};

/**
 * Removes all of the message in front of or after the command
 * @param {string} message
 * @param {string} command
 * @param {boolean} locationInFront
 * @return {string}
 */
var extractAddress = function extractAddress(message, command, locationInFront) {
  var address = void 0;
  var messageToArray = message.split(command);
  if (locationInFront) {
    address = messageToArray[0].trim();
  } else {
    address = messageToArray[messageToArray.length - 1].trim();
  }

  return address;
};

exports.default = returnAddress;