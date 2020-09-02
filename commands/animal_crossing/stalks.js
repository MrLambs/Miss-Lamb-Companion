const { RichEmbed } = require('discord.js');
const { dandelion } = require('../../util/colors.json');
const { stripIndents } = require('common-tags');

const stalks = require('ac-stalk-market-analyzer');
const thumb = 'https://vignette.wikia.nocookie.net/animalcrossing/images/8/85/Daisy_Mae.png/revision/latest/top-crop/width/360/height/450?cb=20200220213944'

module.exports = {
    config: {
        name: "stalks",
        aliases: ["turnip"],
        usage: `(turnip sell prices each day)`,
        description: "Record a few turnip sell prices for a few different days. Enter them after \`/stalks\` to determine which pattern they are following.",
        accessableby: "Members",
        category: "animal_crossing"
    },
    run: async (bot, message, args) => {
        console.log(`[LOGS] Command Triggered: Stalks | ${new Date()}`)
        let errEmbed = new RichEmbed()
        .setColor("RED")
        .setDescription(':x: Please enter at least 2 prices for the analyzer to analyze.')
        if (!args) return message.channel.send(errEmbed)
        let isNaNFlag = false;
        args.forEach(a => {
            if (isNaN(Number(a))) {
                isNaNFlag = true;
            }
        })
        let nanEmbed = new RichEmbed()
        .setColor("RED")
        .setDescription(':x: One of those was not a real number!')
        if (isNaNFlag) return message.channel.send(nanEmbed)
        const prices = [];
        args.forEach(a => prices.push(Number(a)))
        let response = stalks.default(prices)

        switch (response) {
            case "spikeBig":
                let sbEmbed = new RichEmbed()
                    .setColor(dandelion)
                    .setTitle(`I am predicting a Big Spike Pattern.`)
                    .setThumbnail(thumb)
                    .setDescription(stripIndents`
                    
                    With **Big Spike Pattern** there will be:

                    ~ A series of __**three increases**__, with the third being the **maximum** sell price.
                    ~ **Two decreases** following the maximum are still higher than average sell price
                    
                    ~ This gives you an opportunity to realize a smaller return before the remaining price decreases rob you of an opportunity for profit.
                    `)
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
                    .setTimestamp();

                message.channel.send(sbEmbed)
                    break;
            case "spikeSmall":
                let ssEmbed = new RichEmbed()
                    .setColor(dandelion)
                    .setTitle(`I am predicting a Small Spike Pattern.`)
                    .setThumbnail(thumb)
                    .setDescription(stripIndents`
                    
                    With **Small Spike Pattern** there will be:

                    ~ A series of __**four increases**__
                    ~ **A single decrease** following the maximum are still higher than average sell price
                    
                    ~ The pattern will then decrease from there on.
                    `)
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
                    .setTimestamp();

                    message.channel.send(ssEmbed)
                break;
            case "decreasing":
                let dEmbed = new RichEmbed()
                    .setColor(dandelion)
                    .setTitle(`I am predicting a Decreasing Pattern.`)
                    .setThumbnail(thumb)
                    .setDescription(stripIndents`
                    
                    With **Decreasing Pattern** there will be:

                    ~ **Every** sell price change is __**lower**__ than the one before.
                    ~ If no increase occurs throughout the week, you should sell by Thursday afternoon.
                    `)
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
                    .setTimestamp();

                    message.channel.send(dEmbed)
                break;
            case "random":
                let rEmbed = new RichEmbed()
                    .setColor(dandelion)
                    .setTitle(`I am predicting a Random Pattern.`)
                    .setThumbnail(thumb)
                    .setDescription(stripIndents`
                    
                    With **Random Pattern** there will be:

                    ~ Pricing is __**unpredictable**__.
                    ~ Pricing will likely jump between 50 and 200 bells.
                    `)
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
                    .setTimestamp();

                    message.channel.send(rEmbed)
                break;
            case "unkown":
                let uEmbed = new RichEmbed()
                    .setColor(dandelion)
                    .setTitle(`I am predicting an Unknown Pattern.`)
                    .setThumbnail(thumb)
                    .setDescription(stripIndents`
                    
                    With **Unknown Pattern** there will be:

                    ~ There is **not** enough pricing data to determine a pattern.
                    ~ This is common when some prices are **not** recorded.
                    `)
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
                    .setTimestamp();

                    message.channel.send(uEmbed)
                break;
        }
    }
};