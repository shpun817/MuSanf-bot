import Discord = require('discord.js');
import { Player } from '../player';

export async function changeIdle(msg: Discord.Message, args: string[]) {
    if (args.length === 0) {
        await msg.channel.send(`Current idle time is ${Player.getIdleTimeSeconds()} seconds.`);
        return;
    }
    let newIdleTime: number;
    try {
        newIdleTime = parseFloat(args[0]);
        if (!isFinite(newIdleTime) || !Number.isInteger(newIdleTime) || newIdleTime < 30 || newIdleTime > 180) {
            throw new Error();
        }
    } catch (_) {
        await msg.channel.send("Please input a valid idle time in seconds (30-180).");
        return;
    }

    await msg.channel.send(
        `I'll wait ${newIdleTime} seconds before disconnecting.`
    );
    Player.setIdleTimeSeconds(newIdleTime);
}