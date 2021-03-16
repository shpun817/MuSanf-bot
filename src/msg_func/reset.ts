import Discord = require('discord.js');
import { Player } from '../player';
import { SongQueue } from '../song_queue';

export async function reset(msg: Discord.Message | null, args: string[]) {
    msg?.guild.me.voice.channel.leave();
    const empty: boolean = args.length === 0;
    const silent: boolean = args.includes('silent');
    if (empty || args.includes('player')) {
        Player.reset();
        if (!silent && msg !== null) {
            await msg.channel.send("Mom just got me a new Player!");
        }
    }
    if (empty || args.includes('queue')) {
        SongQueue.clear();
        if (!silent && msg !== null) {
            await msg.channel.send("The song queue is good as *new*.");
        }
    }
    return;
}