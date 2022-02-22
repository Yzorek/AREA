const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newLink(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request("INSERT INTO link_actions_reactions(id_user, id_actions, id_reactions, params_action, params_reaction, is_active) VALUES ($1, $2, $3, $4, $5, true);", [parseInt(dataToken.id), req.body.idAction, req.body.idReaction, JSON.stringify(req.body.paramsAction), JSON.stringify(req.body.paramsReaction)]);
        res.status(200).send({
            message: 'OK!'
        })
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
        })
    }
}

async function deleteLink(req, res) {
    try {
        await fctDataBase.request("DELETE FROM link_action_reactions WHERE id=$1", [parseInt(res.params.id)]);
        res.status(200).send({
            message: 'OK!'
        })
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
        })
    }
}

async function updateLink(req, res) {

    try {
        await fctDataBase.request("UPDATE link_actions_reactions SET id_actions=$1, id_reactions=$2, params_action=$4, params_action=$5, is_active=$6 WHERE id=$3;", [req.body.idAction, req.body.idReaction, parseInt(res.params.id), JSON.stringify(req.body.paramsAction), JSON.stringify(req.body.paramsReaction), req.body.isActive]);
        res.status(200).send({
            message: 'OK!'
        })
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
        })
    }
}

async function getLinkByService(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const data = await fctDataBase.request("SELECT * FROM link_actions_reactions WHERE id_user=$1", [parseInt(dataToken.id)]);

        let target = []
        data.rows.forEach((item) => {
                if (res.locals.reactions.find(elem => elem.id === item.id_actions).id_service === parseInt(req.query.idService) ||
                    res.locals.actions.find(elem => elem.id === item.id_actions).id_service === parseInt(req.query.idService))
                    target.push({
                            id: item.id,
                            idActions: item.id_actions,
                            idReactions: item.id_reactions,
                            paramsAction: JSON.parse(item.params_action),
                            paramsReaction: JSON.parse(item.params_reaction),
                            isActive: item.is_active,
                        }
                    )
            }
        )

        res.status(200).send(target)
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
        })
    }
}

async function getActions(req, res, next) {
    try {
        const data = await fctDataBase.request("SELECT * FROM actions;", []);

        res.locals.actions = data.rows;
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err'
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
            message: 'err'
        })
    }
}

async function getLink(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const data = await fctDataBase.request("SELECT * FROM link_actions_reactions WHERE id_user=$1", [parseInt(dataToken.id)]);

        let target = []
        data.rows.forEach((item) => target.push({
            id: item.id,
            idActions: item.id_actions,
            idReactions: item.id_reactions,
            paramsAction: JSON.parse(item.params_action),
            paramsReaction: JSON.parse(item.params_reaction),
            isActive: item.is_active,
        }))

        res.status(200).send(target)
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
        })
    }
}

module.exports = {
    newLink,
    updateLink,
    getLink,
    deleteLink,
    getReactions,
    getActions,
    getLinkByService
}