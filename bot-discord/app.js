const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const excString = "!!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.author.bot)
        return

})

client.login('OTQwOTEyNjkyODY3MjY0NTYz.YgOTOw.f54-ym5cgCNvwSDjY1lhK4Aa8o0')