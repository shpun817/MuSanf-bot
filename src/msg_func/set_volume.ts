import Discord = require('discord.js');
import { Player } from '../player';

export async function setVolume(msg: Discord.Message, args: string[]) {
    try {
        let newVolume = parseFloat(args[0]);
        if (newVolume < 0 || newVolume > 200) {
            throw new Error();
        }
        await msg.channel.send(`Setting volume to ${newVolume}`);
        // 0.5 is half, 1 is normal, 2 is double
        Player.dispatcher.setVolume(newVolume / 100);
    } catch (_) {
        await msg.channel.send("Please input a valid volume (0-200).");
    }
}