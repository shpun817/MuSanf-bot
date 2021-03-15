import Discord = require('discord.js');
import { Song } from '../song';
import { SongQueue } from '../song_queue';

export async function showQueue(msg: Discord.Message, args: string[]) {
    let result = "```\n";
    const queue = SongQueue.getQueue();
    
    for (const song of queue) {
        result += `${song.title}\n`;
    }

    result += "```\n";
    return msg.channel.send(result);
}