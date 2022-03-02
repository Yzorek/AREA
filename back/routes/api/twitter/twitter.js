const express = require('express');
const router = express.Router();

const fctAuth = require('./auth');

/* POST get bearer token */
router.post('/auth', fctAuth.authTwitter);


module.exports = router;