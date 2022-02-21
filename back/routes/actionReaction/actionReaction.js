const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctGetAR = require("./getAR");
const fctLink = require("./link");

router.get('/', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getActions, fctGetAR.getReactions, (req, res) => res.status(200).send({
    actions: res.locals.actions,
    reactions: res.locals.reactions
}))

router.get('/actions', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getActions, (req, res) => res.status(200).send(res.locals.actions))

router.get('/reactions', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getReactions, (req, res) => res.status(200).send(res.locals.reactions))

router.get('/link', fctToken.auth, fctLink.getLink)

router.post('/link', fctToken.auth, fctLink.newLink)

router.put('/link/:id', fctToken.auth, fctLink.updateLink)

router.delete('/link/:id', fctToken.auth, fctLink.deleteLink)

module.exports = router;