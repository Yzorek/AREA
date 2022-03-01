const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");
const settingsToken = require('../../config/token.json').settings;
const bcrypt = require("bcrypt");
const moment = require("moment");

async function sendToken(req, res) {
    try {
        let ip = req.socket.remoteAddress

        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        await fctDataBase.request('INSERT INTO connexion_history(id_user, ip, date) VALUES ($1, $2, $3);', [res.locals.id, ip, `${moment().format('YYYY-MM-DDTHH:mm:ss')}`]);

        res.status(200).json({
            accessToken: fctToken.generateToken(res.locals.id),
            duration: settingsToken.expiresIn,
        });
    } catch (err) {
        res.status(500).send({
            error: 'BDD error',
        });
    }

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

async function newClient(body) {
    try {
        await bcrypt.hash(body.password, 10, (err, hash) => {
            return new Promise(async (resolve, reject) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                try {
                    await fctDataBase.request("INSERT INTO clients(username, first_name, last_name, email, password, is_identified, avatar, auth, id_theme, id_status, is_tutorial_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
                        [body.username, body.firstName, body.lastName, body.email, hash, false, body.avatar ? body.avatar : null, body.auth, 1, 1, true]);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
        })
    } catch (err) {
        throw err;
    }
}

async function getInfoUser(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT password, id FROM clients WHERE email=$1;', [req.body.email]);

        if (data.rowCount === 0) {
            if (req.body.type !== 'local') {
                await newClient(req.body);
                data = await fctDataBase.request('SELECT password, id FROM clients WHERE email=$1;', [req.body.email]);
                res.locals = {...data.rows[0]};
                next()
            } else {
                res.status(403).send({
                    error: "This email doesn't exist, retry or create your account."
                });
            }
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