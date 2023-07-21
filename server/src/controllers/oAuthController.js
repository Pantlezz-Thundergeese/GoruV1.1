const db = require('../config/profileSchema.js');
const axios = require('axios');
const CLIENT_ID = 'c238f56e0e5708918de2';
const CLIENT_SECRETS = '716573f16cb7a24c2f599c541cead19d3f3df7dc';

const oAuthController = {};

oAuthController.getQueryString = async (req, res, next) => {
  const queryString = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRETS}&code=${req.query.code}`;

  try {
    const axiosRes = await axios.post(
      'https://github.com/login/oauth/access_token' + queryString,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const data = axiosRes.data;
    const end = data.indexOf('&scope');
    const access_token = data.slice(13, end);

    console.log(access_token);
    res.locals.token = access_token;
    console.log('Backend: received ', data);

    res.cookie('github_token', access_token, { maxAge: 90000, httpOnly: true });
    console.log('Backend: created a cookie with access_token');
    return next();
  } catch (err) {
    res.status(500);
  }
};

// access_token=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&scope=&token_type=bearer

// token : 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  -> "&scope"

oAuthController.getGithubData = async (req, res, next) => {
  const { data } = await axios.get('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${res.locals.token}`,
    },
  });

  //   console.log(data);
  const userData = {
    name: data.login,
    id: data.id,
    contact: data.html_url,
  };

  res.locals.data = userData;
  return next();
};

// put it in our server

// send the databck
module.exports = oAuthController;
