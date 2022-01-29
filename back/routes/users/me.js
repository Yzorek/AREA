const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

async function getUserData(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(dataToken.id)]);

        if (data.rowCount === 0) {
            res.status(403).send({
                message: "This user doesn't exist"
            });
        } else {
            res.status(200).send({
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
            })
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
    editUser
}