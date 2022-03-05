const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctGetAR = require("./getAR");
const fctLink = require("./link");
const fctAll = require("../services/all");

router.get('/', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getActions, fctGetAR.getReactions, (req, res) => res.status(200).send({
    actions: res.locals.actions,
    reactions: res.locals.reactions
}))

router.get('/service/actions' /*?idService=*/, fctToken.auth, fctGetAR.getActionsByService)

router.get('/service/reactions' /*?idService=*/, fctToken.auth, fctGetAR.getReactionsByService)

router.get('/actions', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getActions, (req, res) => res.status(200).send(res.locals.actions))

router.get('/reactions', fctToken.auth, fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getReactions, (req, res) => res.status(200).send(res.locals.reactions))

router.get('/link', fctToken.auth, fctLink.getLink, (req, res) => res.status(200).send(res.locals.target))

router.get('/ilian', fctToken.auth, fctLink.getLink,  fctGetAR.getServices, fctGetAR.getLinkService, fctGetAR.getActions, fctGetAR.getReactions, (req, res) => res.status(200).send({
    link: res.locals.target,
    services: res.locals.services,
    actions: res.locals.actions,
    reactions: res.locals.reactions
}))

router.get('/service/link' /*?idService=*/, fctToken.auth, fctLink.getReactions, fctLink.getActions, fctLink.getLinkByService)

router.post('/link', fctToken.auth, fctLink.newLink)

router.put('/link/:id', fctToken.auth, fctLink.updateLink)

router.delete('/link/:id', fctToken.auth, fctLink.deleteLink)


module.exports = router;