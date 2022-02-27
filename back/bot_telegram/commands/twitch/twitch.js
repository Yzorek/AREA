const { Telegraf } = require('telegraf')
const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

module.exports = function (ctx, data) {
    ctx.reply(data.user_login + "is on Live")
}