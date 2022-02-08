const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctGetAR = require("./getAR");

router.get('/', fctToken.auth, fctGetAR.getActions, fctGetAR.getReactions, (req, res) => res.status(200).send({
    actions: res.locals.actions,
    reactions: res.locals.reactions
}))

router.get('/actions', fctToken.auth, fctGetAR.getActions, (req, res) => res.status(200).send(res.locals.actions))

router.get('/reactions', fctToken.auth, fctGetAR.getReactions, (req, res) => res.status(200).send(res.locals.reactions))

router.post('/link', fctToken.auth, )

router.put('/link/:id', fctToken.auth, )

module.exports = router;