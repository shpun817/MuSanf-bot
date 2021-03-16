import Discord = require('discord.js');
import { Player } from '../player';
import { SongQueue } from '../song_queue';

export async function reset(msg: Discord.Message | null, args: string[]) {
    Player.voiceChannelConnection?.disconnect();
    const empty: boolean = args.length === 0;
    const silent: boolean = args.includes('silent');
    await msg?.channel.send("*Resetting......*");
    if (empty || args.includes('player')) {
        Player.reset();
        if (!silent) {
            await msg?.channel.send("Mom just got me a new Player!");
        }
    }
    if (empty || args.includes('queue')) {
        SongQueue.clear();
        if (!silent) {
            await msg?.channel.send("The song queue is good as *new*.");
        }
    }
    return;
}