const axios = require('axios')
const { Telegraf } = require('telegraf')

const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

const chatIDGroup = -730273977
const chatIDUser = 922550661

let myUser = []
let myGroup = []

const bot = new Telegraf(token)
bot.command('start', (ctx) => {
    if (ctx.chat.username)
        myUser.push(ctx.chat)
    console.log(ctx.chat)
    if (ctx.chat.title)
        myGroup.push(ctx.chat)
    ctx.reply('Initialize')
})
bot.launch()

const telegramUrl = "https://api.telegram.org/bot" + token;
//axios.post(telegramUrl + "/sendMessage?chat_id=" + chatIDUser + "&text=" + "test is on stream")

function sendMessageTwitchInTelegramToUser(data, user_name) {
    let target = myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " is on stream")
}

function sendMessageTwitchInTelegramToGroup(data, group_name) {
    let target = myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " is on stream")
}

function sendMessageTwitchInTelegramToUserOverflow(data, user_name) {
    let target = myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " exceed " + data.viewer_count + "!")
}

function sendMessageTwitchInTelegramToGroupOverflow(data, group_name) {
    let target = myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " exceed " + data.viewer_count + "!")
}

function sendMessageTwitchInTelegramToUserSpecificGame(data, user_name) {
    let target = myUser.find(item => item.username.toLowerCase() === user_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " play to " + data.game_name + "!")
}

function sendMessageTwitchInTelegramToGroupSpecificGame(data, group_name) {
    let target = myGroup.find(item => item.title.toLowerCase() === group_name.toLowerCase())
    if (target)
        axios.post(telegramUrl + "/sendMessage?chat_id=" + target.id + "&text=" + data.user_name + " play to " + data.game_name + "!")
}

module.exports = {
    sendMessageTwitchInTelegramToUser,
    sendMessageTwitchInTelegramToGroup,
    sendMessageTwitchInTelegramToUserOverflow,
    sendMessageTwitchInTelegramToGroupOverflow,
    sendMessageTwitchInTelegramToUserSpecificGame,
    sendMessageTwitchInTelegramToGroupSpecificGame
}