/* global process */
import request from 'request-promise';
import { createErrorMessage } from './helpers.js';

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
        return Promise.reject('This location does not exist!');
      }

      const { lat, lng } = parsedBody.results[0].geometry.location;
      locationName = parsedBody.results[0].address_components[0].long_name;
      const darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;

      return request(darkSkyUrl);

    }).then((darkSkyResponse) => {

      const parsedBody = JSON.parse(darkSkyResponse);

      const { summary, temperature } = parsedBody.currently;

      const weatherResponse = {'messages': [
        {
          'type': 'text',
          'text': `It's ${summary.toLowerCase()} and ${parseInt(temperature)} degrees right now in ${locationName}`
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
