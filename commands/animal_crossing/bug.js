const { RichEmbed } = require('discord.js');
const { dandelion } = require('../../util/colors.json');
const { titleCase } = require('../../util/functions.js');

const bugs = require('../../game_data/animal_crossing/bugs.json');

module.exports = {
    config: {
        name: "bug",
        aliases: [],
        usage: `(name of bug to look up)`,
        description: "Brings back information on a desired bug from Animal Crossing Wiki.",
        accessableby: "Members",
        category: "animal_crossing"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Bug | ${new Date()}`)
        let errEmbed = new RichEmbed()
            .setColor("RED")
            .setDescription(':x: Please enter the name of a bug for me to search.')
        if (!args) return message.channel.send(errEmbed)
        if (args.length > 1) {
            let first = titleCase(args[0])
            let rest = args.slice(1, args.length).join(" ").toLocaleLowerCase()
            search = (first + " " + rest)
        } else {
            search = titleCase(args[0])
        }        
        let found;
        let embed = new RichEmbed()
            .setColor(dandelion)
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
            .setTimestamp();
        bugs.forEach(b => {
            if (b.name.includes(search) || b.name === search) {
                found = b;
            }
        })
        if (found != undefined) {
        embed
        .setTitle(found.name)
        .setURL(found.url)
        .setThumbnail(found.icon)
        .addField('Price:', `\`${found.sell_price} Bells\``, true)
        .addField('Time:', `\`${found.time}\``, true)
        .addField('Northern Hempisphere:', `\`${found.seasons.north_hemi}\``)
        .addField('Southern Hemisphere:', `\`${found.seasons.south_hemi}\``)
        return message.channel.send(embed)
        } else {
            console.log(`[ERR] Bug not found`)
            let notFoundEmbed = new RichEmbed()
            .setColor("RED")
            .setDescription(':x: Could not find a bug with that name. Please check spelling and try again.')
            return message.channel.send(notFoundEmbed);
        }
    }
}