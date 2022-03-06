const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctUser = require('./user')
const fctConversation = require('./conversation')

/* GET home page. */
router.get('/', function(req, res, next) {
   res.status(200).send("bababa")
});

router.get('/user', fctToken.auth, fctUser.getUser)

router.post('/conversation', fctToken.auth, fctConversation.checkConversation, fctConversation.newConversation)
router.get('/conversation', fctToken.auth, fctConversation.getConversation, fctConversation.getUserInfoConversation)

module.exports = router;