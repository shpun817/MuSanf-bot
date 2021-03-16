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

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member.user.bot) {
        return;
    }
    const botChannelID = oldState.guild.me.voice.channelID;
    if (botChannelID !== null) {
        // User is leaving from the voice channel that the bot is in
        if (oldState.channelID === botChannelID && oldState.channelID !== newState.channelID) {
            // Check if bot is the only one in the channel
            if (oldState.guild.me.voice.channel.members.size === 1) {
                reset(null, ['player', 'queue']);
                console.log("Bot is alone. Disconnecting...");
            }
        }
    }
});

client.login(process.env.BOT_TOKEN);