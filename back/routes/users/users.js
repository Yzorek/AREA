const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctMe = require('./me')

/* GET my user data */
router.get('/me', fctToken.auth, fctMe.getUserData);

module.exports = router;