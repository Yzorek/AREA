const { MessageEmbed } = require('discord.js');

module.exports = function (msg, client, data) {
    const exampleEmbed = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle(data.title)
        .setURL("https://www.twitch.tv/" + data.user_login)
        .setFooter(data.started_at)
        .setImage(data.thumbnail_url)
        .setAuthor(data.user_name + " is now streaming")
        .addField(" Playing ", data.game_name, true,)
        .addField("Started at ", data.started_at, true)
    msg.channel.send({ embeds: [exampleEmbed] });
}