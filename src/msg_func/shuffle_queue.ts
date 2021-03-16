import Discord = require('discord.js');
import { SongQueue } from '../song_queue';

export async function shuffleQueue(msg: Discord.Message, args: string[]) {
    SongQueue.shuffle();
    await msg.channel.send("My little cousins came over and the queue is total chaos...");
    return;
}