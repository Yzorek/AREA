const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

function sendMe(req, res) {
    res.status(200).send(res.locals.body);
}

async function getServiceActive(req, res, next) {
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

        res.locals.body.services = res.locals.services
        next()
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function getUserData(req, res, next) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(dataToken.id)]);

        if (data.rowCount === 0) {
            res.status(403).send({
                message: "This user doesn't exist"
            });
        } else {
            res.locals.body = {
                id: data.rows[0].id,
                username: data.rows[0].username,
                firstName: data.rows[0].first_name,
                lastName: data.rows[0].last_name,
                email: data.rows[0].email,
                isIdentified: !!data.rows[0].is_identified,
                avatar: data.rows[0].avatar,
                auth: data.rows[0].auth,
                idTheme: data.rows[0].id_theme,
                idStatus: data.rows[0].id_status,
                isTutorialMode: data.rows[0].is_tutorial_mode
            }
            next()
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function editUser(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('UPDATE clients SET username=$1, first_name=$2, last_name=$3, avatar=$4, email=$5 WHERE id=$6;', [req.body.username, req.body.firstName, req.body.lastName, req.body.avatar, req.body.email, parseInt(dataToken.id)]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getUserData,
    editUser,
    getServiceActive,
    sendMe
}