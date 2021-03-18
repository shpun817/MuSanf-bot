import Discord = require('discord.js');
import { Player } from '../player';

export async function changeBitrate(msg: Discord.Message, args: string[]) {
    try {
        if (args.length !== 1) {
            throw new Error("Just tell me how many bps do I use.");
        }
        const bitrate = parseInt(args[0]);
        if (!isFinite(bitrate) || bitrate < 0) {
            throw new Error(`What is this bitrate *${bitrate}*?`);
        }
        Player.bitrate = bitrate;
        await msg.channel.send(`I will play the next song at bitrate ${bitrate}.`);
    } catch (e) {
        await msg.reply(e);
        return;
    }
}