import Discord = require('discord.js');
import { Player } from '../player';
import { SongQueue } from '../song_queue';

export async function reset(msg: Discord.Message | null, args: string[]) {
    if (msg !== null) {
        msg.guild.me.voice.channel.leave();
    }
    const silent: boolean = args.includes('silent');
    if (args.includes('player')) {
        Player.reset();
        if (!silent && msg !== null) {
            await msg.channel.send("Player is reset.");
        }
    }
    if (args.includes('queue')) {
        SongQueue.clear();
        if (!silent && msg !== null) {
            await msg.channel.send("The song queue has been cleared.");
        }
    }
    return;
}