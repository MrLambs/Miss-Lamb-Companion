const {
    RichEmbed
} = require('discord.js');

module.exports = {
    config: {
        name: "uptime",
        description: "Displays the bots current uptime!",
        usage: ``,
        accessableby: "Members",
        aliases: ["ut"],
        category: "moderation"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Uptime | ${new Date()}`)
        try {
            function duration(ms) {
                const sec = Math.floor((ms / 1000) % 60).toString();
                const min = Math.floor((ms / (1000 * 60)) % 60).toString();
                const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();

                return `${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
            };
            let utEmbed = new RichEmbed()
                .setColor("GREEN")
                .setDescription(`I have been online for: ${duration(bot.uptime)}`)
            message.channel.send(utEmbed);
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};