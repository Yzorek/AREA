const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");
const settingsToken = require('../../config/token.json').settings;
const bcrypt = require("bcrypt");

function sendToken(req, res) {
    res.status(200).json({
        accessToken: fctToken.generateToken(res.locals.id),
        duration: settingsToken.expiresIn,
    });
}

function hashCheck(body, hash) {
    return new Promise(async (resolve, reject) => {
        try {
            bcrypt.compare(body.password, hash, function (err, res) {
                resolve(res);
            });
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

async function checkPassword(req, res, next) {
    try {
        let checkPassword = await hashCheck(req.body, res.locals.password);

        if (checkPassword) {
            next();
        } else {
            res.status(403).send({
                error: 'Wrong password, try again.',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: 'BDD error',
        });
    }
}

async function getInfoUser(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT password, id FROM clients WHERE email=$1;', [req.body.email]);

        if (data.rowCount === 0) {
            res.status(403).send({
                error: "This email doesn't exist, retry or create your account."
            });
        } else {
            res.locals = {...data.rows[0]};
            next()
        }
    } catch (err) {
        res.status(500).send({
            error: 'BDD error',
        });
    }
}

module.exports = {
    getInfoUser,
    checkPassword,
    sendToken
}