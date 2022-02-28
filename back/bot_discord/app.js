const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require('discord.js');

const excString = "!!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    //console.log("----------- CHANNELS -----------")
    //client.channels.cache.forEach(item => console.log(item.name))
    //console.log("----------- GUILDS -----------")
    //client.guilds.cache.forEach(item => console.log(item.name))
    //console.log("----------- USERS -----------")
    //client.users.cache.forEach(item => console.log(item.username))

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

function sendMessageTwitchInGuilds(channelsName, guilds, data) {
    let guild = client.guilds.cache.find(item => item.name.toLowerCase() === guilds.toLowerCase())

    if (!guild)
        return;
    let channel = guild.channels.cache.find(item => item.name.toLowerCase() === channelsName.toLowerCase());

    if (!channel)
        return;

    const twitchEmbed = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle(data.title)
        .setURL("https://www.twitch.tv/" + data.user_login)
        .setFooter(data.started_at)
        .setImage(data.getThumbnailUrl())
        .setAuthor(data.user_name + " is now streaming")
        .addField(" Playing ", data.game_name, true,)
        .addField("Started at ", data.started_at, true)

    channel.send({ embeds: [twitchEmbed] });
}

function sendMessageYoutubeInGuilds(channelsName, guilds, data) {
    let guild = client.guilds.cache.find(item => item.name.toLowerCase() === guilds.toLowerCase())

    if (!guild)
        return;
    let channel = guild.channels.cache.find(item => item.name.toLowerCase() === channelsName.toLowerCase());

    if (!channel)
        return;

    const youtubeEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle(data.title)
        .setURL("https://www.youtube.com/watch?v=" + data.user_login)
        .setDescription("{description}")
        .setFooter("Youtube")
        .setAuthor(data.user_name + " is now streaming")
        .addField("Subscribers ", data.game_name || 0, true,)
        .addField("Videos ", data.started_at || 0, true)
        .addField("Verified ", data.started_at ? 'Yes' : 'No', false)
        .setThumbnail()

    channel.send({ embeds: [youtubeEmbed] });
}

function sendClassicMessage(channelsName, guilds, data) {
    let guild = client.guilds.cache.find(item => item.name.toLowerCase() === guilds.toLowerCase())

    if (!guild)
        return;
    let channel = guild.channels.cache.find(item => item.name.toLowerCase() === channelsName.toLowerCase());

    if (!channel)
        return;

    const classicMessage = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle(data.title)
        .addField("Info ", data.message || 0, true)

    channel.send({ embeds: [classicMessage] });
}


function sendMessageTwitchInMessage(channelsName, username, data) {

    //console.log("je suis la 1");
    client.guilds.cache.forEach(async elem => {
        //console.log("je suis la 3");
        //let members = await elem.members
        //console.log("je suis la 2");
        elem.members.cache.forEach(item => {
            //console.log(item)
        })
    })
    /*const twitchEmbed = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle(data.title)
        .setURL("https://www.twitch.tv/" + data.user_login)
        .setFooter(data.started_at)
        .setImage(data.getThumbnailUrl())
        .setAuthor(data.user_name + " is now streaming")
        .addField(" Playing ", data.game_name, true,)
        .addField("Started at ", data.started_at, true)

    channel.send({ embeds: [twitchEmbed] });*/
}

client.login('OTQwOTEyNjkyODY3MjY0NTYz.YgOTOw.f54-ym5cgCNvwSDjY1lhK4Aa8o0')


module.exports = {
    sendMessageTwitchInGuilds,
    sendMessageTwitchInMessage,
    sendMessageYoutubeInGuilds,
    sendClassicMessage
}