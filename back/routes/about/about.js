const express = require('express');
const router = express.Router();
const moment = require('moment');

const service = require('./service.json')

/* GET home page. */
router.get('/about.json', function(req, res, next) {
    res.status(200).json({
        client: {
            host: req.ip.substr(7)
        },
        server: {
            current_time: moment().unix(),
            services: service
        },
    });
});

module.exports = router;