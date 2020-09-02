const { prefix } = require('../../util/config.json');
const { scrape } = require('../../util/functions.js')

module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
    console.log('[LOGS] Scraping data..')
    await scrape()
    console.log('[LOGS] Scraping complete')
    bot.user.setActivity(`games from 2011 | ${prefix}help`, { type: "PLAYING" });
}