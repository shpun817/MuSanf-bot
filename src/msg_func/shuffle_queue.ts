import Discord = require('discord.js');
import { SongQueue } from '../song_queue';

export async function shuffleQueue(msg: Discord.Message, args: string[]) {
    SongQueue.shuffle();
    msg.channel.send("The queue has been shuffled.");
    return;
}