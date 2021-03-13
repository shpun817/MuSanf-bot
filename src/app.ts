import Discord = require('discord.js');
import { parseMessage } from './parse_message';
require('dotenv').config();

export const client = new Discord.Client();

client.once('ready', () => {
    console.log("MuSanf is ready");
});

client.on('message', parseMessage);

client.login(process.env.BOT_TOKEN);