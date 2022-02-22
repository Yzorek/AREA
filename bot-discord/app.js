const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const {MessageEmbed} = require('discord.js');

const excString = "!!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    const channel = client.channels;

    console.log(channel);
    if (msg.author.bot)
        return
    require("./commands/twitch/twitch")(msg, client, {
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
})
    require("./config").commands.forEach(item => {
        try {
            if (msg.content === `${excString}${item.name}`)
                item.fct(msg, client);
        } catch (e) {
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('ERROR !')
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setDescription('One error as pop in my systeme, sorry try again later')
                .setFooter('If you have question, please call WhiteWolf');
            msg.channel.send({embeds: [exampleEmbed]});
            console.log("----------------------------------------------------------- ERROR -----------------------------------------------------------");
            console.log(e);
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
        }
    })
})

client.login('OTQwOTEyNjkyODY3MjY0NTYz.YgOTOw.f54-ym5cgCNvwSDjY1lhK4Aa8o0')