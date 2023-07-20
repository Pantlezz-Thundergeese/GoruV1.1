const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const CLIENT_ID = 'c238f56e0e5708918de2';
const CLIENT_SECRETS = '716573f16cb7a24c2f599c541cead19d3f3df7dc';

const axios = require('axios');

const app = express();
const PORT = 3000;

// Routers
const techRouter = require(path.join(__dirname, '/src/routes/techRouter'));
const postRouter = require(path.join(__dirname, '/src/routes/postRouter'));
const userRouter = require(path.join(__dirname, '/src/routes/userRouter'));

// Parse incoming JSON, static reqeusts, forms, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./dist'));
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

// API router for server handling of db info
app.use('/api/tech', techRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// controller
const oAuthController = require(path.join(
  __dirname,
  '/src/controllers/oAuthController'
));

app.get(
  '/getAccessToken',
  oAuthController.getQueryString,
  //one more for session
  async (req, res) => {
    res.sendStatus(200);
  }
);

app.get('/getUserData', async (req, res) => {
  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('userdata is', data);
      res.json(data);
    });
});

// Default unknown page handler
app.use('*', (req, res) => {
  res.status(404).send('Error: Page not found.');
});

// Express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
