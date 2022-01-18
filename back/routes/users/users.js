const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctMe = require('./me')
const fctById = require('./byId')
const fctAll = require('./all')

/* GET my user data */
router.get('/me', fctToken.auth, fctMe.getUserData);

/* GET user data by id */
router.get('/:id', fctToken.auth, fctById.getUserDataById);

/* GET user all data */
router.get('/all', fctToken.auth, fctAll.getUserDataAll);

/* PUT user edit */
router.put('/me', fctToken.auth, fctMe.editUser);

/* POST user edit */
router.post('/identification/:id');

module.exports = router;