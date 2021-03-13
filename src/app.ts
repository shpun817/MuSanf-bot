import Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log("MuSanf is ready")
});

client.on('message', (msg: Discord.Message) => {
    if (msg.content === 'Hello') msg.reply('Hi');
});

client.login(process.env.BOT_TOKEN);