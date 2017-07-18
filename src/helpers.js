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
