const axios = require("axios");
const fctDataBase = require("../../../tools/fctDBRequest");
const fctToken = require('../../../tools/fctToken');

const spotify = {
    client_id: "187c0fc794714871bbe61948b5232d56", //a mettre dans le fichier config
    client_secret: "0204c7a6e66c4be698d5286f5bf5e7a6"
};

async function authSpotify(req, res, next) {
    try {
        let body = new URLSearchParams({
                'code': req.body.code.split('&')[0],
                'grant_type': 'authorization_code',
                'redirect_uri': 'http://localhost:8082/App/SpotifyRedirect',
            }
        );
        let auth = 'Basic ' + Buffer.from(spotify.client_id + ":" + spotify.client_secret).toString("base64");
        const response = await axios.post(`https://accounts.spotify.com/api/token`, body,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': auth,
                }
            });
        try {
            let dataToken = fctToken.getTokenData(req);
            await fctDataBase.request('UPDATE clients SET spotify_token=$1 WHERE id=$2;', [response.data.access_token, parseInt(dataToken.id)]);
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
            message: 'Err spotify API',
            err: err
        })
    }
}

module.exports = {
    authSpotify,
}