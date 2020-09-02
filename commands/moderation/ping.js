const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: ``,
        accessableby: "Members",
        aliases: ["latency"],
        category: "moderation"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Ping | ${new Date()}`)
        try {
        message.channel.send('Pinging...').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let choices = ["**Is this really my ping?**", "**Is it okay? I can't look**", "**I hope it isn't bad**", "**Ruh roh raggy**"];
            let response = choices[Math.floor(Math.random() * choices.length)];

            let pEmbed = new RichEmbed()
            .setColor("GREEN")
            .setDescription(`${response}: \nBot Latency: \`${ping}ms\`, \nAPI Latency: \`${Math.round(bot.ping)}ms\``)

            m.edit(pEmbed)
        })
    } catch (e) {
        console.log(`[ERR] ${e.message}`)
    }
    }
};