const { MessageEmbed } = require('discord.js');

module.exports = function (msg, client) {
    let data = []

    require("../../config").commands.forEach(item => {
        data.push({name: item.name, value: item.description})
    })

    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Command')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription('All commands are available')
        .addFields(data)
        .setFooter('Woof journée à tous !');


    msg.channel.send({ embeds: [exampleEmbed] });
}