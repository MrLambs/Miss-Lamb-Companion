const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const villagers = require('../game_data/animal_crossing/villagers.json');
const fish = require('../game_data/animal_crossing/fish.json');
const bugs = require('../game_data/animal_crossing/bugs.json')

//Scrape functions
async function villagerScrape() {
    const res = await request.get('https://animalcrossing.fandom.com/wiki/Villager_list_(New_Horizons)');
    const $ = cheerio.load(res);
    let data = [];
    $('.sortable tbody tr').each((i, el) => {
        let name = $(el).find('td')[0]
        let icon = $(el).find('td a')[1]
        let personality = $(el).find('td')[2]
        let species = $(el).find('td')[3]
        let birthday = $(el).find('td')[4]
        let catchphrase = $(el).find('td')[5]
        data.push({
            name: $(name).text(),
            icon: $(icon).attr('href'),
            personality: $(personality).text(),
            species: $(species).text(),
            birthday: $(birthday).text(),
            catchphrase: $(catchphrase).text()
        })
    })
    if (villagers != data) {
    fs.writeFileSync("./game_data/animal_crossing/villagers.json", JSON.stringify(data, null, 2), function (error) {
        if (error) console.log(error);
    })
    }
};

async function fishScrape() {
    const res = await request.get('https://gamewith.net/animal-crossing-new-horizons/article/show/16346');
    const $ = cheerio.load(res);

    let data = []
    $('.acnh_mushi table tbody tr').each((i, el) => {
        let nameSection = $(el).find('td')[1]
        let name = $(nameSection).find('a')
        let nameRefined = $(name).text()

        let shadowSection = $(el).find('td')[2]
        let shadowSize = $(shadowSection).text()

        let sellSection = $(el).find('td')[3]
        let locationSection = $(el).find('td')[4]
        let timeSection = $(el).find('td')[5]
        let raritySection = $(el).find('td')[6]

        data.push({
            name: $(nameRefined).text(),
            shadow_size: $(shadowSize).text(),
            sell_price: $(sellSection).text(),
            location: $(locationSection).text(),
            rarity: $(raritySection).text(),
            seasons: {
                north_hemi: $(timeSection).get(0).firstChild.data,
                south_hemi: $(timeSection).find('br').get(0).nextSibling.nodeValue
            },
            time: $(timeSection).find('hr').get(0).nextSibling.nodeValue,
            icon: $(name).children().attr('data-original'),
            url: $(name).attr('href')
        })
    })

    if (fish != data) {
        fs.writeFileSync("./game_data/animal_crossing/fish.json", JSON.stringify(data, null, 2), function (error) {
            if (error) console.log(error);
        })
    }
};

async function bugScrape() {
    const res = await request.get('https://gamewith.net/animal-crossing-new-horizons/article/show/16347');
    const $ = cheerio.load(res);

    let data = []
    $('.acnh_mushi table tbody tr').each((i, el) => {

        let nameSection = $(el).find('td')[1]
        let name = $(nameSection).find('a')
        let nameRefined = $(name).text()

        let sellSection = $(el).find('td')[2]
        let timeYearSection = $(el).find('td')[3]
        let timeDaySection = $(el).find('td')[4]

        data.push({
            name: $(nameRefined).text(),
            sell_price: $(sellSection).text(),
            time: $(timeDaySection).text(),
            seasons: {
                north_hemi: $(timeYearSection).get(0).firstChild.data,
                south_hemi: $(timeYearSection).find('hr').get(0).nextSibling.nodeValue
            },
            icon: $(name).children().attr('data-original'),
            url: $(name).attr('href')
        })
    })

    if (bugs != data) {
        fs.writeFileSync("./game_data/animal_crossing/bugs.json", JSON.stringify(data, null, 2), function (error) {
            if (error) console.log(error);
        })
    }
};

function scrape() {
    villagerScrape();
    fishScrape();
    bugScrape();
};
exports.scrape = scrape;


//Formatting functions
function titleCase(oldStr) {
    return oldStr.charAt(0).toLocaleUpperCase() + oldStr.slice(1).toLocaleLowerCase()
};

exports.titleCase = titleCase;