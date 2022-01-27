const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctMe = require('./me')
const fctById = require('./byId')
const fctAll = require('./all')
const fctExit = require('./identification')
const fctPassword = require('./password')
const fctHistoryCommunication = require('./historyConnection');
const fctTheme = require('./theme');

/* GET my user data */
router.get('/me', fctToken.auth, fctMe.getUserData);

/* GET Theme user */
router.get('/theme', fctToken.auth, fctTheme.getTheme);

/* PUT Theme user */
router.put('/theme', fctToken.auth, fctTheme.editTheme);

/* GET history connection by user */
router.get('/historyConnection', fctToken.auth, fctHistoryCommunication.getHistoryConnection);

/* GET user data by id */
router.get('/:id', fctToken.auth, fctById.getUserDataById);

/* GET user all data */
router.get('/', fctToken.auth, fctAll.getUserDataAll);

/* PUT user edit */
router.put('/me', fctToken.auth, fctMe.editUser);

/* POST user edit */
router.post('/identification/:id', fctExit.identification);

/* POST update password */
router.put('/password', fctToken.auth, fctPassword.checkPassword, fctPassword.updatePassword);

module.exports = router;