const { MessageEmbed } = require('discord.js');

module.exports = function (msg, client) {
    const exampleEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Bot's Live Status")
        .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
        .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
        .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")

    msg.channel.send({ embeds: [exampleEmbed] });
}