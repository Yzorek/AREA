const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const moment = require("moment");
express.Router();


async function postSubReddit(arData) {
    let redditToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            redditToken = data.rows[0].reddit_token;
        }
    } catch (err) {
        console.log("error")
        console.log(err);
    }
    let bearer = 'Bearer ' + redditToken;
    try {
        let res = await axios.post(`https://oauth.reddit.com/api/submit`,
            {
                'title': 'test_title',
                'kind': 'self',
                'text': 'this_is_text_test',
                'sr': 'test',
                'resubmit': 'true',
                'send_replies': 'true',

            },
            {
                'headers': {
                    'Content-type': 'application/json',
                    'Authorization': bearer,
                }
            });
        return (res.data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    postSubReddit,
}