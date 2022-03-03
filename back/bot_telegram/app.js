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
    axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" +  'https://twitter.com/' + data.username + "/status/" + data.id)
}

function sendMessageTwitterToGroupTelegram(data, group_name) {
    let target = require('../app').myUser.find(item => item.username.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" +  'https://twitter.com/' + data.username + "/status/" + data.id)
}

module.exports = {
    sendMessageTwitchInTelegramToUser,
    sendMessageTwitchInTelegramToGroup,
    sendMessageTwitchInTelegramToUserOverflow,
    sendMessageTwitchInTelegramToGroupOverflow,
    sendMessageTwitchInTelegramToUserSpecificGame,
    sendMessageTwitchInTelegramToGroupSpecificGame,
}