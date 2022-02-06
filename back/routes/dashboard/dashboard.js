const express = require('express');
const router = express.Router();
const fctToken = require("../../tools/fctToken");

const fctWidget = require('./widget')

router.get('/widget', fctToken.auth, fctWidget.getWidget);

router.post('/widget', fctToken.auth, fctWidget.newWidgetByUser);

router.delete('/widget', fctToken.auth, fctWidget.deleteWidget);

module.exports = router;