import Discord = require('discord.js');
import { Song } from '../song';
import { SongQueue } from '../song_queue';

export async function showQueue(msg: Discord.Message, args: string[]) {
    const queue = SongQueue.getQueue();

    if (queue.length === 0) {
        return msg.channel.send("The queue is empty, add more ;D?");
    }

    let result = "```\n";
    
    for (let i = 0; i < queue.length; ++i) {
        result += `${i+1}) ${queue[i].title}\n`;
    }

    result += "```\n";
    return msg.channel.send(result);
}