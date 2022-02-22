const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require('discord.js');

const excString = "!!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    console.log("----------- CHANNELS -----------")
    client.channels.cache.forEach(item => console.log(item.name))
    console.log("----------- GUILDS -----------")
    client.guilds.cache.forEach(item => console.log(item.name))
    console.log("----------- USERS -----------")
    client.users.cache.forEach(item => console.log(item.username))

    if (msg.author.bot)
        return
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
            msg.channel.send({ embeds: [exampleEmbed] });
            console.log("----------------------------------------------------------- ERROR -----------------------------------------------------------");
            console.log(e);
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
        }
    })
})

client.login('OTQwOTEyNjkyODY3MjY0NTYz.YgOTOw.f54-ym5cgCNvwSDjY1lhK4Aa8o0')