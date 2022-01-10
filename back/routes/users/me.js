const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

async function getUserData(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [dataToken.id]);

        if (data.rowCount === 0) {
            res.status(403).send({
                error: "This user doesn't exist"
            });
        } else {
            res.status(200).send({
                id: data[0].id,
                username: data[0].username,
                firstName: data[0].first_name,
                lastName: data[0].last_name,
                email: data[0].email,
                isIdentified: !!data[0].is_identified,
                avatar: data[0].avatar,
                auth: data[0].auth
            })
        }
    } catch (err) {
        res.status(500).send({
            error: 'BDD error',
        });
    }
}

module.exports = {
    getUserData
}