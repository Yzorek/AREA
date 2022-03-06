const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const qs = require('qs');
express.Router();

async function postSubReddit(arData) {
    console.log(arData);
    let redditToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            redditToken = data.rows[0].reddit_token;
        }
    } catch (err) {
        console.log(err);
    }
    let bearer = 'Bearer ' + redditToken;
    var data = qs.stringify({
        'title': 'test_title',
        'kind': 'self',
        'text': 'this_is_text_test',
        'sr': 'z',
        'resubmit': 'true',
        'send_replies': 'true'
    });
    var config = {
        method: 'post',
        url: 'https://oauth.reddit.com/api/submit',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'edgebucket=tULdbqvVmKOxOziAXO; loid=000000000083bk9mar.2.1600110277003.Z0FBQUFBQmlKUGVoQk1XalJWUjFkSVFERjd1aUEwV3EyNHcwa2VuNXpPWWR5ZWk2ay1sR3kyTlktRFpSUUhka21oZkwydmR0Qkl4WkdlLWJwNW5ZWXVyZzFrOFhaMEhwWmpfUEpTbkg1RU9LYnQzLTgwMnRKcW5JZVRTenFKeURKOTJnSlN6SExXTHY; session_tracker=rpkmejfopnqehrcgbj.0.1646589939777.Z0FBQUFBQmlKUGYwR1NrRGduNUxXdk5EbWtadDlRTXhFazFyT09lazVwSVJMaUluZzluOXhTbEV0RUZmTkJjMzhFYkdTQ3J3bFA1UGctT2JHWkFMOHpIUTZiNmhLa3Q2UkdzRFJSaTFmYVhtclc1UEhaTTd1YWlCQmY1SUZnUWNzTGl5QUdlVEROWlc'
        },
        data : data
    };
    try {
        let res = await axios(config)
        console.log(res.data);
        return (res.data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    postSubReddit,
}