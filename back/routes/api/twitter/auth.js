const axios = require("axios");
const fctDataBase = require("../../../tools/fctDBRequest");
const fctToken = require('../../../tools/fctToken');
const moment = require("moment");

const twitter = {
    client_id: "YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ", //a mettre dans le fichier config
    client_secret: "OhEVgTOExeb4OSe4A3EOzrKRzttKbPrUB10MULU-3B4jIKLMll"
};

async function authTwitter(req, res, next) {
    try {
        let body = {'body': {
            code: req.body.code,
            grant_type: 'authorization_code',
            client_id: twitter.client_id,
            redirect_uri: process.env.REACT_APP_DASHBOARD_FRONT + '/App/TwitterRedirect',
            code_verifier: 'challenge'
        }}
        let auth = 'Basic ' + btoa(twitter.client_id + ":" + twitter.client_secret);
        const response = await axios.post(`https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&code=${req.body.code}&client_id=${twitter.client_id}&redirect_uri=${process.env.REACT_APP_DASHBOARD_FRONT}/App/TwitterRedirect&code_verifier=challenge`, body,
            {
                'headers': {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': auth,
                }
            });
        try {
            let dataToken = fctToken.getTokenData(req);
            await fctDataBase.request('UPDATE clients SET twitter_token=$1 WHERE id=$2;', [response.data.access_token, parseInt(dataToken.id)]);
            await fctDataBase.request('UPDATE clients SET twitter_refresh=$1 WHERE id=$2;', [response.data.refresh_token, parseInt(dataToken.id)]);
            await fctDataBase.request('UPDATE clients SET twitter_date=$1 WHERE id=$2;', [moment().format('YYYY-MM-DDTHH:mm:ss'), parseInt(dataToken.id)]);
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
            message: 'Err twitter API',
            err: err
        })
    }
}

module.exports = {
    authTwitter,
}