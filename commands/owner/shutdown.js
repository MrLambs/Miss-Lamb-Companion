module.exports = {
    config: {
        name: "restart",
        aliases: ["reboot", "shutdown"],
        usage: ``,
        description: "Shuts the bot down",
        accessableby: "Bot Owner",
        category: "owner"
    },
    run: async (bot, message, args) => {
    if (message.author.id === '328912599276060673' || message.author.id === '379149411567009792') {
    try {
        await message.channel.send(`Rebooting...`)
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`);
    };
} else {
    return message.channel.send('You do not have permission to do that.')
}
}
};
