const express = require('express');
const router = express.Router();
const fctLogin = require("./login");
const fctRegister = require("./register")

/* POST login api. */
router.post('/login', fctLogin.getInfoUser, fctLogin.checkPassword, fctLogin.sendToken);

/* POST register api. */
router.post('/register', fctRegister.checkUserIsAlreadyCreate, fctRegister.insertIntoClients, fctRegister.checkInsert, fctRegister.identificationMail, fctRegister.sendToken);

module.exports = router;