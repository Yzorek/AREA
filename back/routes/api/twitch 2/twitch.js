const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctUsers = require('./users');

/* GET users streamer */
router.get('/users', fctUsers.getUsersBySearchKey);


module.exports = router;