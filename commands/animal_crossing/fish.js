const {
    RichEmbed
} = require('discord.js');
const {
    dandelion
} = require('../../util/colors.json');
const {
    titleCase
} = require('../../util/functions.js');

const fish = require('../../game_data/animal_crossing/fish.json');

module.exports = {
    config: {
        name: "fish",
        aliases: [],
        usage: `(name of fish to look up)`,
        description: "Brings back information on a desired fish from Animal Crossing Wiki.",
        accessableby: "Members",
        category: "animal_crossing"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Fish | ${new Date()}`)
        let errEmbed = new RichEmbed()
            .setColor("RED")
            .setDescription(':x: Please enter the name of a fish for me to search.')
        if (!args) return message.channel.send(errEmbed)
        let search;
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
        fish.forEach(f => {
            if (f.name.includes(search)) {
                found = f;
            }
        })
        if (found != undefined) {
            embed
                .setTitle(found.name)
                .setURL(found.url)
                .setThumbnail(found.icon)
                .addField('Price:', `\`${found.sell_price} Bells\``, true)
                .addField('Location:', `\`${found.location}\``, true)
                .addField('Time:', `\`${found.time}\``, true)
                .addField('Shadow Size:', `\`${found.shadow_size}\``, true )
                .addField('Rarity:', `\`${found.rarity}\``, true)
                .addField('Northern Hempisphere:', `\`${found.seasons.north_hemi}\``)
                .addField('Southern Hemisphere:', `\`${found.seasons.south_hemi}\``)
            return message.channel.send(embed)
        } else {
            console.log(`[ERR] Fish not found`)
            let notFoundEmbed = new RichEmbed()
                .setColor("RED")
                .setDescription(':x: Could not find a fish with that name. Please check spelling and try again.')
            return message.channel.send(notFoundEmbed);
        }
    }
}