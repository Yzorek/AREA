const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctCountry = require("./country");

/* GET country data */
router.get('/country', fctCountry.getDataCountry);

module.exports = router;