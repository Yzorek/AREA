const axios = require('axios')
const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

const telegramUrl = "https://api.telegram.org/bot" + token;

//axios.post(telegramUrl + "/sendMessage?chat_id=" + chatIDUser + "&text=" + "test is on stream")

function sendMessageTwitchInTelegramToUser(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " is on stream, check it on " + "\"https://www.twitch.tv/" + data.user_login + "\"")
}

function sendMessageTwitchInTelegramToGroup(data, group_name) {
    let target = require('../app').myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " is on stream, check it on " + "https://www.twitch.tv/" + data.user_login)
}

function sendMessageTwitchInTelegramToUserOverflow(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " exceed " + data.viewer_count + "!")
}

function sendMessageTwitchInTelegramToGroupOverflow(data, group_name) {
    let target = require('../app').myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " exceed " + data.viewer_count + "!")
}

function sendMessageTwitchInTelegramToUserSpecificGame(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " play to " + data.game_name + "!")
}

function sendMessageTwitchInTelegramToGroupSpecificGame(data, group_name) {
    let target = require('../app').myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " play to " + data.game_name + "!")
}

function sendMessageTwitterToUserTelegram(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + 'https://twitter.com/' + data.username + "/status/" + data.tweet_id)
}

function sendMessageTwitterToGroupTelegram(data, group_name) {
    let target = require('../app').myGroup.find(item => item.username.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + 'https://twitter.com/' + data.username + "/status/" + data.tweet_id)
}

function sendMessageCRToUserTelegram(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    let str = data.isWin ? " has just won a game!" : " has just lost a game!";
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.pseudo + str)
}

function sendMessageCRToGroupTelegram(data, group_name) {
    let target = require('../app').myGroup.find(item => item.username.toLowerCase() === group_name.toLowerCase())
    let str = data.isWin ? " has just won a game!" : " has just lost a game!";
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.pseudo + str)
}

function sendMessageSpotifyLikedTrackToUserTelegram(data, user_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    let link = data.track_uri.split(':');
    if (target) {
        if (data.playerState === true) {
            axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + "@" + data.username + " his currently playing tracks => " + 'https://open.spotify.com/track/' + link[2])
        } else {
            axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + "@" + data.username + " has liked new track => " + 'https://open.spotify.com/track/' + link[2])
        }
    }
}

function sendMessageSpotifyLikedTrackInTelegramToGroup(data, group_name) {
    let target = require('../app').myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    let link = data.track_uri.split(':');
    if (target) {
        if (data.playerState === true) {
            axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + "@" + data.username + " his currently playing tracks => " + 'https://open.spotify.com/track/' + link[2])
        } else {
            axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + "@" + data.username + " has liked new track => " + 'https://open.spotify.com/track/' + link[2])
        }
    }
}

module.exports = {
    sendMessageTwitchInTelegramToUser,
    sendMessageTwitchInTelegramToGroup,
    sendMessageTwitchInTelegramToUserOverflow,
    sendMessageTwitchInTelegramToGroupOverflow,
    sendMessageTwitchInTelegramToUserSpecificGame,
    sendMessageTwitchInTelegramToGroupSpecificGame,
    sendMessageTwitterToUserTelegram,
    sendMessageTwitterToGroupTelegram,
    sendMessageSpotifyLikedTrackInTelegramToGroup,
    sendMessageSpotifyLikedTrackToUserTelegram,
    sendMessageCRToUserTelegram,
    sendMessageCRToGroupTelegram
}