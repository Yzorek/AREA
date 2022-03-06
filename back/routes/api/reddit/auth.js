const axios = require("axios");
const fctDataBase = require("../../../tools/fctDBRequest");
const fctToken = require('../../../tools/fctToken');

const reddit = {
    client_id: "A1dJ6sEJqHjO27RHN4pwTw", //a mettre dans le fichier config
    client_secret: "zvsbdivtLT__0UhH1sr0hx0wpAm5Gw"
};

async function authReddit(req, res, next) {
    try {
        let body = new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': req.body.code.split('#')[0],
                'redirect_uri': process.env.REACT_APP_DASHBOARD_FRONT + '/App/RedditRedirect',
            }
        );
        let auth = 'Basic ' + Buffer.from(reddit.client_id + ":" + reddit.client_secret).toString("base64");
        console.log(auth)
        const response = await axios.post(`https://www.reddit.com/api/v1/access_token`, body,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': auth,
                }
            });
        try {
            let dataToken = fctToken.getTokenData(req);
            await fctDataBase.request('UPDATE clients SET reddit_token=$1 WHERE id=$2;', [response.data.access_token, parseInt(dataToken.id)]);
            console.log(response.data);
            res.status(200).send(response.data);
        } catch (err) {
            res.status(500).send({
                message: 'BDD error',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Err reddit API',
            err: err
        })
    }
}

module.exports = {
    authReddit,
}