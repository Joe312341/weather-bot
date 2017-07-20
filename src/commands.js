/**
 * Checks if commands are part of the message and acts accordingly
 * Although "what's the weather in" is not necessary in this case it is
 * added for completeness purpose and with the intent to improve this
 * methodology in the future (i.e. created some extract engine)
 * @param {string} message
 * @return {string}
 */
const returnAddress = (message) => {

  // inFront mean everything before the command gets treated as the <Location>
  let commands = [
    { text: 'what\'s the weather in', isInFront: false },
    { text: 'weather in', isInFront: false },
    { text: 'weather', isInFront: true }
  ];

  for(let i = 0; i < commands.length; i++) {
    if(message.includes(commands[i].text)){
      return extractAddress(message, commands[i].text, commands[i].isInFront);
    }
  }

  return '';
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
