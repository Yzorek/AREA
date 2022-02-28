const axios = require('axios')

const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

const chatIDGroup = -730273977
const chatIDUser = 922550661

const telegramUrl = "https://api.telegram.org/bot" + token;
//axios.post(telegramUrl + "/sendMessage?chat_id=" + chatIDUser + "&text=" + "test is on stream")

function sendMessageTwitchInTelegramGroup(data) {
    axios.post(telegramUrl + "/sendMessage?chat_id=" + chatIDGroup + "&text=" + data.user_name + "is on stream")
}

function sendMessageTwitchInTelegramUser(chatID, data) {
    axios.post(telegramUrl + "/sendMessage?chat_id=" + chatID + "&text=" + data.user_name + "is on stream")
}

module.exports = {
    sendMessageTwitchInTelegramGroup,
    sendMessageTwitchInTelegramUser,
}