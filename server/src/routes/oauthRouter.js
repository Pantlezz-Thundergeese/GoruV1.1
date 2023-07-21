const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');
const oAuthController = require('../controllers/oAuthController');

const router = express.Router();

router.get(
  '/', //gettoken
  oAuthController.getQueryString,
  //getgithub data
  oAuthController.getGithubData,
  (req, res) => {
    console.log(res.locals.data);
    res.status(200).json(res.locals.data);
  }
);
module.exports = router;
