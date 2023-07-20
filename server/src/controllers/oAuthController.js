const db = require('../config/profileSchema.js');

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
    const access_token = data.slice(13);
    console.log(access_token);
    console.log('Backend: received ', data);
    res.cookie('github_token', access_token, { maxAge: 90000, httpOnly: true });
    console.log('created a cookie with access_token');
    return next();
  } catch (err) {
    res.status(500);
  }
};
module.exports = oAuthController;
