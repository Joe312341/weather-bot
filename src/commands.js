/**
 * Checks if commands are part of the message and acts accordingly
 * @param {string} message
 * @param {string} command
 * @param {boolean} locationInFront
 * @return {string}
 */
const returnAddress = (message) => {
  const commands = ['what\'s the weather in', 'weather in', 'weather'];
  if(message.includes(commands[0])){
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
const extractAddress = (message, command, locationInFront) => {
  let address;
  const messageToArray = message.split(command);
  if(locationInFront) {
    address = messageToArray[0].trim();
  } else {
    address = messageToArray[messageToArray.length-1].trim();
  }

  return address;
};

export default returnAddress;
