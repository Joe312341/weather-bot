/* global process */
import request from 'request-promise';
import { createErrorMessage } from './helpers.js';
import { gMapErrMsg } from './errorMessages';
import { pickRandomSentenceStart } from './grammar';
/**
 * Create a welcome message
 * @param {string} username
 * @return {Object}
 */
export const greetUser = (username) => {
  return {
    'messages': [
      {
        'type': 'text',
        'text': `Hey ${username}, what's up?`
      }
    ]
  };
};

/**
 * Retrieves the current weather for the address
 * For multiple gMap responses it will take the first address
 * @param {string} address
 * @return {Promise}
 */
export const getWeather = (address) => {

  const gmapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.G_MAP_KEY}`;

  let locationName;

  return request(gmapUrl)
    .then((gmapResponse) => {

      const parsedBody = JSON.parse(gmapResponse);
      if(parsedBody.results.length === 0){
        return Promise.reject(gMapErrMsg);
      }

      const { lat, lng } = parsedBody.results[0].geometry.location;
      // its questionable which address to use here to make the bot seem most natural
      // but also correct in all instances with a valid location
      locationName = parsedBody.results[0].formatted_address;
      const darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;

      return request(darkSkyUrl);

    }).then((darkSkyResponse) => {

      const parsedBody = JSON.parse(darkSkyResponse);

      const { summary, temperature } = parsedBody.currently;

      const weatherResponse = {'messages': [
        {
          'type': 'text',
          'text': `${pickRandomSentenceStart()} the forecast is ${summary.toLowerCase()} and ${Math.floor(temperature)} degrees right now for ${locationName}`
        }
      ]};

      return weatherResponse;

    }).then((responseMessage) => {
      return responseMessage;
    })
    .catch((err) => {
      return createErrorMessage(err);
    });
};
