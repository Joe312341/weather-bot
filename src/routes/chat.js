import express from 'express';
import multer from 'multer';
import returnAdress from '../commands';
import { getWeather, greetUser } from '../apiMethods';
import { createErrorMessage } from '../helpers.js';

const upload = multer();
const chatRouter = express.Router();

chatRouter.post('/messages', upload.single(), (req, res) => {
  const userRequest = req.body;

  switch (userRequest.action) {
  case 'join': {
    const response = greetUser(userRequest.name);
    res.json(response);
    break;
  }
  case 'message': {
    const address = returnAdress(userRequest.text);
    // no address could be extracted
    if(address === ''){
      // return new Error('No address found');
      const errorMessage = createErrorMessage('Make sure you use one of these 3 commands: what\'s the weather in <Location>, weather in <Location>, <Location> weather');
      res.json(errorMessage);
    } else {
      getWeather(address).then((result) => {
        res.json(result);
      });
    }
    break;
  }
  default:
    res.send(403);
  }
});


export default chatRouter;
