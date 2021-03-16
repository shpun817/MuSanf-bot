import Discord = require('discord.js');
import { Player } from '../player';

export async function setVolume(msg: Discord.Message, args: string[]) {
    if (args.length === 0) {
        await msg.channel.send(`Current volume is ${Player.getVolume()}`);
        return;
    }
    try {
        let newVolume = parseFloat(args[0]);
        if (!isFinite(newVolume) || newVolume < 0 || newVolume > 100) {
            throw new Error();
        }
        await msg.channel.send(`Setting volume to ${newVolume}`);
        Player.setVolume(newVolume);
    } catch (_) {
        await msg.channel.send("Please input a valid volume (0-100).");
    }
}