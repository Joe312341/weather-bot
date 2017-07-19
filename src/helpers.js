/**
 * Converts text to a Object sendable with res.json()
 * Currently only supports a single message
 * @param {string} text
 * @return {Object}
 */
export const createErrorMessage = (text) => {
  return {
    'messages': [
      {
        'type': 'text',
        'text': text
      }
    ]
  };
};
