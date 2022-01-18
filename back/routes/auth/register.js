const fctToken = require("../../tools/fctToken");
const fctDataBase = require("../../tools/fctDBRequest");
const fctMail = require("../../tools/fctMail");
const {settings: settingsToken} = require("../../config/token.json");
const bcrypt = require("bcrypt");

function sendToken(req, res) {
    res.status(200).json({
        accessToken: fctToken.generateToken(res.locals.id),
        duration: settingsToken.expiresIn,
    });
}

function identificationMail(req, res, next) {
    try {
        fctMail.createMail(req.body.email, "Welcome to Ulys! Please confirme your email! to Ulys application!")
        next();
    } catch (err) {
        res.status(500).send({
            message: 'Error send mail',
        });
    }
}

async function insertIntoClients(req, res, next) {
    try {
        await bcrypt.hash(req.body.password, 10, (err, hash) => {
            return new Promise(async (resolve, reject) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                try {
                    await fctDataBase.request("INSERT INTO clients(username, first_name, last_name, email, password, is_identified, avatar, auth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
                        [req.body.username, req.body.firstName, req.body.lastName, req.body.email, hash, false, req.body.avatar ? req.body.avatar : null, req.body.auth]);
                    next();
                    resolve();
                } catch (err) {
                    res.status(500).send({
                        message: 'BDD error',
                    });
                    reject(err);
                }
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function checkInsert(req, res, next) {
    try {
        let data = await fctDataBase.request("SELECT id FROM clients WHERE email=$1;", [req.body.email]);

        if (data.rowCount === 0) {
            res.status(500).send({
                message: 'Insert error'
            });
        } else {
            res.locals = {
                id: data.rows[0].id
            }
            next();
        }
    } catch (err) {
        res.status(500).send({
            message: 'Error server',
        });
    }
}

async function checkUserIsAlreadyCreate(req, res, next) {
    try {
        let data = await fctDataBase.request("SELECT id FROM clients WHERE email=$1;", [req.body.email]);

        if (data.rowCount >= 1) {
            res.status(403).send({
                message: 'This clients have already create a account.'
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    checkUserIsAlreadyCreate,
    insertIntoClients,
    identificationMail,
    checkInsert,
    sendToken
}