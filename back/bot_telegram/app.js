const {Telegraf} = require('telegraf')

//const bot = new TelegramBot(token, {polling: true});
const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

const excString = "!!";

const bot = new Telegraf(token)
bot.command('test', (ctx) => ctx.reply('Hello'))
bot.on('message', (ctx) => {
    require("./config").commands.forEach(item => {
        try {
            console.log(ctx)
            if (ctx.text === `${excString}${item.name}`)
                item.fct(ctx, {
                    id: '44777820604',
                    user_id: '50597026',
                    user_login: 'ponce',
                    user_name: 'Ponce',
                    game_id: '490100',
                    game_name: 'Lost Ark',
                    type: 'live',
                    title: 'PONCE - Oh la grosse journée MEUPORG avec Onu et RdBidet ! !lostark | !rs !boutique',
                    viewer_count: 9385,
                    started_at: '2022-02-22T09:43:08Z',
                    language: 'fr',
                    thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_ponce-500x400.jpg',
                    tag_ids: [Array],
                    is_mature: true,
                });
        } catch (e) {
            ctx.reply("Error")
            console.log("----------------------------------------------------------- ERROR -----------------------------------------------------------");
            console.log(e);
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
        }
    })
})
bot.launch()