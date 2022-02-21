const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newLink(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request("INSERT INTO link_actions_reactions(id_user, id_actions, id_reactions, params_action, params_reactions) VALUES ($1, $2, $3, $4, $5);", [parseInt(dataToken.id), req.body.idAction, req.body.idReaction, JSON.stringify(req.body.paramsAction), JSON.stringify(req.body.paramsReaction)]);
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
        await fctDataBase.request("UPDATE link_actions_reactions SET id_actions=$1, id_reactions=$2, params_action=$4, params_action=$5 WHERE id=$3;", [req.body.idAction, req.body.idReaction, parseInt(res.params.id), JSON.stringify(req.body.paramsAction), JSON.stringify(req.body.paramsReaction)]);
        res.status(200).send({
            message: 'OK!'
        })
    } catch (err) {
        res.status(500).send({
            message: 'bdd error'
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
    deleteLink
}