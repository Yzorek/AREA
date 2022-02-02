const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctCountry = require("./country");
const fctCity = require("./city");

/* GET country data */
router.get('/country', fctCountry.getDataCountry);

/* GET city data by iso*/
router.get('/cities', fctCity.getDataCityByISO);

module.exports = router;