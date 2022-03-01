const { MessageEmbed } = require('discord.js');

module.exports = function (msg, client, data) {
    const exampleEmbed = new MessageEmbed()
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
    msg.channel.send({ embeds: [exampleEmbed] });
}