import Discord = require('discord.js');
import { reset } from './msg_func/reset';
import { parseMessage } from './parse_message';
require('dotenv').config();

export const client = new Discord.Client();

client.once('ready', () => {
    reset(null, ['player', 'queue']);
    console.log("MuSanf is ready");
});

client.on('message', parseMessage);

client.login(process.env.BOT_TOKEN);