const fctDataBase = require("../../tools/fctDBRequest");

async function getActions(req, res, next) {
    try {
        const data = await fctDataBase.request("SELECT * FROM actions;", []);

        res.locals.actions = data.rows;
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getReactions(req, res, next) {
    try {
        const data = await fctDataBase.request("SELECT * FROM reactions;", []);

        res.locals.reactions = data.rows;
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

module.exports = {
    getActions,
    getReactions,
}