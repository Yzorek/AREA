const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const router = express.Router();
const https = require('https')

let lastTweet = []
let userLastTweet = []
let lastMentinonned = []

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

async function getTwitterUserMe(arData) {
    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

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
        let res = await axios.get(`https://api.twitter.com/2/users/me`,
        {
            'headers': {
                'Authorization': bearer,
            }
        });
        return (res.data);
    } catch (err) {
        console.log(err)
    }
}

async function getTwitterUser(arData) {
    let params_action = JSON.parse(arData.params_action)

    if (!params_action[0].value)
        return;

    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

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
        let res = await axios.get(`https://api.twitter.com/2/users/by/username/${params_action[0].value}`,
        {
            'headers': {
                'Authorization': bearer,
            }
        });
        return (res.data);
    } catch (err) {
        console.log(err)
    }
}

async function getTwitterUserById(arData, userId) {
    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

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
        let res = await axios.get(`https://api.twitter.com/2/users/${userId}`,
        {
            'headers': {
                'Authorization': bearer,
            }
        });
        return (res.data);
    } catch (err) {
        console.log(err)
    }
}

async function getTwitterUserTweets(arData, userId) {
    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

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
        let res = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets?exclude=retweets&tweet.fields=created_at`,
        {
            'headers': {
                'Authorization': bearer,
            }
        });
        return (res.data);
    } catch (err) {
        console.log(err)
    }
}

async function getTwitterUserMentions(arData, userId) {
    let twitterToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

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
        let res = await axios.get(`https://api.twitter.com/2/users/${userId}/mentions?expansions=author_id&tweet.fields=created_at`,
        {
            'headers': {
                'Authorization': bearer,
            }
        });
        return (res.data);
    } catch (err) {
        console.log(err)
    }
}

async function YouAreMentionned(arData) {
    let me = await getTwitterUserMe(arData);
    if (me === undefined || me.data.id === undefined) return;
    let mentions = await getTwitterUserMentions(arData, me.data.id);
    if (mentions === undefined || mentions.meta.newest_id === undefined) return;
    let lastTweetMention = lastMentinonned.find((e) => e.user_id === me.data.id && e.id_reaction === arData.id_reactions);
    if (lastTweetMention !== undefined) {
        if (lastTweetMention.last_tweet !== mentions.meta.newest_id) {
            if (Date.parse(lastTweetMention.created_at) < Date.parse(mentions.data[0].created_at)) {
                let user = await getTwitterUserById(arData, mentions.data[0].author_id);
                let data = {
                    username: user.data.username,
                    mentionned: me.data.username,
                    tweet_id: mentions.meta.newest_id,
                }
                if (arData.id_reactions === 2) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToGroupTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 5) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToUserTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 3) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInGuilds(params_reaction[1].value, params_reaction[0].value, data)
                } else if (arData.id_reactions === 1) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInMessage(params_reaction[0].value, data)
                }
            }
            lastTweetMention.last_tweet = mentions.meta.newest_id;
            lastTweetMention.created_at = mentions.data[0].created_at;
        }
    } else {
        lastMentinonned.push({
            user_id: me.data.id,
            last_tweet: mentions.meta.newest_id,
            id_reaction: arData.id_reactions,
            created_at: mentions.data[0].created_at
        })
    }
}

async function YouPostATweet(arData) {
    let me = await getTwitterUserMe(arData);
    if (me === undefined || me.data.id === undefined) return;
    let tweets = await getTwitterUserTweets(arData, me.data.id);
    if (tweets === undefined || tweets.meta.newest_id === undefined) return;
    let lastUserTweet = lastTweet.find((e) => e.user_id === me.data.id && e.id_reaction === arData.id_reactions);
    if (lastUserTweet !== undefined) {
        if (lastUserTweet.last_tweet !== tweets.meta.newest_id) {
            if (Date.parse(lastUserTweet.created_at) < Date.parse(tweets.data[0].created_at)) {
                let data = {
                    username: me.data.username,
                    mentionned: undefined,
                    tweet_id: tweets.meta.newest_id,
                }
                if (arData.id_reactions === 2) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToGroupTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 5) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToUserTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 3) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInGuilds(params_reaction[1].value, params_reaction[0].value, data)
                } else if (arData.id_reactions === 1) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInMessage(params_reaction[0].value, data)
                }
            }
            lastUserTweet.last_tweet = tweets.meta.newest_id;
            lastUserTweet.created_at = tweets.data[0].created_at;
        }
    } else {
        lastTweet.push({
            user_id: me.data.id,
            last_tweet: tweets.meta.newest_id,
            id_reaction: arData.id_reactions,
            created_at: tweets.data[0].created_at
        })
    }
}

async function SomeonePostATweet(arData) {
    let user = await getTwitterUser(arData);
    if (user === undefined || user.data.id === undefined) return;
    let tweets = await getTwitterUserTweets(arData, user.data.id);
    if (tweets === undefined || tweets.meta.newest_id === undefined) return;
    let lastUserTweet = userLastTweet.find((e) => e.user_id === user.data.id && e.id_reaction === arData.id_reactions);
    if (lastUserTweet !== undefined) {
        if (lastUserTweet.last_tweet !== tweets.meta.newest_id) {
            if (Date.parse(lastUserTweet.created_at) < Date.parse(tweets.data[0].created_at)) {
                let data = {
                    username: user.data.username,
                    mentionned: undefined,
                    tweet_id: tweets.meta.newest_id,
                }
                if (arData.id_reactions === 2) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToGroupTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 5) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageTwitterToUserTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 3) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInGuilds(params_reaction[1].value, params_reaction[0].value, data)
                } else if (arData.id_reactions === 1) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageTwitterInMessage(params_reaction[0].value, data)
                }
            }
            lastUserTweet.last_tweet = tweets.meta.newest_id;
            lastUserTweet.created_at = tweets.data[0].created_at;
        }
    } else {
        userLastTweet.push({
            user_id: user.data.id,
            last_tweet: tweets.meta.newest_id,
            id_reaction: arData.id_reactions,
            created_at: tweets.data[0].created_at
        })
    }
}

async function reloadTweetsManagement() {
    try {
        let linkForTwitter = await getLinkWithTwitter()

        linkForTwitter.forEach(item => {
            if (item.id_actions === 5) {
                console.log("==== Mentionned tweet ====")
                YouAreMentionned(item)
            } else if (item.id_actions === 11) {
                console.log("==== You post a tweet ====")
                YouPostATweet(item)
            } else if (item.id_actions === 1) {
                console.log("==== Someone post a tweet ====")
                SomeonePostATweet(item)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    postTwitchTweet,
    reloadTweetsManagement
}