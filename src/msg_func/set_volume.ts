import Discord = require('discord.js');
import { Player } from '../player';

export async function setVolume(msg: Discord.Message, args: string[]) {
    if (args.length === 0) {
        await msg.channel.send(`Current volume is ${Player.getVolume()}`);
        return;
    }
    let newVolume: number;
    try {
        newVolume = parseFloat(args[0]);
        if (!isFinite(newVolume) || newVolume < 0 || newVolume > 100) {
            throw new Error();
        }
    } catch (e) {
        console.error(e);
        await msg.channel.send("Please input a valid volume (0-100).");
    }
    
    if (newVolume <= 10) {
        await msg.channel.send(
            `*(Whisper)* Setting volume to ${newVolume}`
        );
    } else if (newVolume >= 50) {
        await msg.channel.send(
            `Setting volume to **${newVolume}**`
        ); 
    } else {
        await msg.channel.send(
            `Setting volume to ${newVolume}`
        ); 
    }
    Player.setVolume(newVolume);
}