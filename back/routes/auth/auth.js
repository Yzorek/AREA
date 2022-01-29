const express = require('express');
const router = express.Router();
const fctToken = require("../../tools/fctToken");
const fctLogin = require("./login");
const fctRegister = require("./register")

/* GET if token is on use. */
router.get('/', fctToken.auth, (req, res) => {
    res.status(200).send({message: 'OK'});
});

/* POST login api. */
router.post('/login', fctLogin.getInfoUser, fctLogin.checkPassword, fctLogin.sendToken);

/* POST register api. */
router.post('/register', fctRegister.checkUserIsAlreadyCreate, fctRegister.insertIntoClients, fctRegister.checkInsert, fctRegister.identificationMail, fctRegister.sendToken);

module.exports = router;