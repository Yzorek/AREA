const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function getLinkService(req, res, next) {
    let dataToken = fctToken.getTokenData(req);

    try {

        let data = await fctDataBase.request('SELECT * FROM link_service WHERE id_user=$1;', [parseInt(dataToken.id)]);

        res.locals.services.forEach(elem => {
            let target = data.rows.find(item => {
                return parseInt(item.id_service) === parseInt(elem.id)
            });

            if (!!target) {
                elem.isActive = true
            }
        })
        next()
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }

}

async function getServices(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT * FROM services;', []);
        let response = []

        data.rows.forEach(item => response.push({
            id: item.id,
            name: item.name,
            color: item.color,
            isActive: false
        }))

        res.locals.services = response;
        next();
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getActions(req, res, next) {
    try {
        const data = await fctDataBase.request("SELECT * FROM actions;", []);
        let target = []

        data.rows.forEach(elem => {
            let find = res.locals.services.find(item => parseInt(elem.id_service) === parseInt(item.id))

            if (!!find && find.isActive)
                target.push(elem)
        })

        res.locals.actions = target;
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
        let target = []

        data.rows.forEach(elem => {
            let find = res.locals.services.find(item => parseInt(elem.id_service) === parseInt(item.id))

            if (!!find && find.isActive)
                target.push(elem)
        })

        res.locals.reactions = target;
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
    getServices,
    getLinkService
}