const axios = require("axios");

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
            redirect_uri: 'http://localhost:8082/App/TwitterRedirect',
            code_verifier: 'challenge'
        }}
        let auth = 'Basic ' + btoa(twitter.client_id + ":" + twitter.client_secret);
        const response = await axios.post(`https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&code=${req.body.code}&client_id=${twitter.client_id}&redirect_uri=http://localhost:8082/App/TwitterRedirect&code_verifier=challenge`, body,
            {
                'headers': {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': auth,
                }
            });
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (err) {
        console.log(err.response.data)
        res.status(500).send({
            message: 'Err twitter API',
            err: err
        })
    }
}

module.exports = {
    authTwitter
}