const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctMe = require('./me')
const fctById = require('./byId')

/* GET my user data */
router.get('/me', fctToken.auth, fctMe.getUserData);

/* GET user data by id */
router.get('/:id', fctToken.auth, fctById.getUserDataById);

module.exports = router;