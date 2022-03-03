const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const router = express.Router();

async function postTwitchTweet(aRdata, twitchData) {
    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(aRdata.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            twitterToken = data.rows[0].twitter_token;
        }
    } catch (err) {
        console.log(err);
    }
    let bearer = 'Bearer ' + twitterToken;
    try {
        axios.post(`https://api.twitter.com/2/tweets`, {
            "text": JSON.parse(aRdata.params_reaction)[0].value
        },
        {
            'headers': {
                'Authorization': bearer,
                'Content-type': 'application/json',
            }
        });
    } catch (err) {
        console.log(err)
    }
}

async function getLinkWithTwitter() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_actions_reactions ' +
            '    LEFT JOIN actions on actions.id = link_actions_reactions.id_actions ' +
            '    WHERE id_service=1;', []);
        let target = []

        data.rows.forEach(item => {
            if (item.is_active)
                target.push(item);
        })
        return target;
    } catch (err) {
        console.log(err);
        return [];
    }
}

module.exports = {
    postTwitchTweet
}