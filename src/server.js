/*global process*/
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chatRouter from './routes/chat.js';

const app = express();
const port = process.env.PORT || 9000;

// to read post params
app.use(bodyParser.json());

// logging
app.use(morgan('combined'));

//CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routing
app.use('/chat', chatRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
