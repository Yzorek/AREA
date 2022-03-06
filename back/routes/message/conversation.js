const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newConversation(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let users = [dataToken.id]
        let name = ""
        req.body.forEach(elem => {
            users.push(elem.id);
            name += `${elem.username},`
        })
        await fctDataBase.request('INSERT INTO conversation(name, users) VALUES ($1, $2);', [name, users]);

        res.status(200).send({
            message: 'Done!'
        });
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function checkConversation(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let users = [dataToken.id]
        let id = -1

        req.body.forEach(elem => users.push(elem.id))
        let data = await fctDataBase.request('SELECT * FROM conversation;', []);

        /*data.rows.forEach(elem => {
            if (elem.users.length === users.length) {
                let target = []

                elem.users.forEach(item => target.push(parseInt(item)))

                if (!target.equals(users)) {
                    id = parseInt(elem.id)
                }
            }
        })*/
        if (id >= 0)
            res.send(200).send({id: id})
        else
            next()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getUserInfoConversation(req, res) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let data = await fctDataBase.request('SELECT id, username, first_name, last_name, avatar FROM clients;', []);

        res.locals.conversation.forEach((item) => {
            let target = []

            item.users.forEach(elem => {
                if (parseInt(elem) !== dataToken.id)
                    target.push(data.rows.find(e => e.id === parseInt(elem)))
            })
            item.users = target;
        })

        res.status(200).send(res.locals.conversation)
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getConversation(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let target = []
        let data = await fctDataBase.request('SELECT * FROM conversation;', []);

        data.rows.forEach((item) => {
            if (!!item.users.find(elem => parseInt(elem) === dataToken.id))
                target.push(item)
        })
        res.locals.conversation = target
        next()

    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

module.exports = {
    newConversation,
    checkConversation,
    getConversation,
    getUserInfoConversation
}