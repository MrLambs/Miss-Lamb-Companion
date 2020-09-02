const { RichEmbed } = require('discord.js');
const { titleCase } = require('../../util/functions.js');
const { stripIndents } = require('common-tags')
const { dandelion } = require('../../util/colors.json')
const { villagers } = require('animal-crossing')

module.exports = {
    config: {
        name: "villager",
        aliases: [],
        usage: `(Name of villager to look up)`,
        description: "Returns info on a desired villager, including personality, birthday and more.",
        accessableby: "Members",
        category: "animal_crossing"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Villager | ${new Date()}`)
        let errEmbed = new RichEmbed()
        .setColor("RED")
        .setDescription(":x: Please enter a villager's name for me to search.")
        if (!args) return message.channel.send(errEmbed);

        let search = args[0].toLowerCase();

        const found = villagers.find(v => v.name.toLowerCase() === search)
        let embed = new RichEmbed()
        .setColor(dandelion)
        .setAuthor(found.name, found.iconImage)
        .setThumbnail(found.photoImage)
        .setDescription(stripIndents`
        House Info

        **- Wallpaper:** ${titleCase(found.wallpaper)}
        **- Flooring:** ${titleCase(found.flooring)}
        `)
        .addField('Styles:', found.styles.join(', '))
        .addField('Favorite Colors:', found.colors.join(', '))
        .addField('Personality:', found.personality, true)
        .addField('Species:', found.species, true)
        .addField('Gender:', found.gender, true)
        .addField('Hobby:', found.hobby, true)
        .addField('Birthday:', found.birthday, true)
        .addField('Default Clothing:', titleCase(found.defaultClothing), true)
        .addField('Catchphrase:', `"${titleCase(found.catchphrase)}"`, true)
        .addField('Favorite Song:', found.favoriteSong, true)
        .addField('Favorite Saying:', `"${found.favoriteSaying}"`, true)

        let notFoundEmbed = new RichEmbed()
        .setColor("RED")
        .setDescription(':x: Could not find a villager with that name. Please check spelling and try again.')
        if (found) {
            message.channel.send(embed)
        } else {
            message.channel.send(notFoundEmbed)
            console.log('[ERR] Villager Not Found')
        }
    }
}