const { MessageEmbed } = require('discord.js');

module.exports = function (msg, client) {
    const exampleEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Your account is now set.")

    msg.channel.send({ embeds: [exampleEmbed] });
}