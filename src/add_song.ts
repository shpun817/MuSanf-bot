import Discord = require('discord.js');
import { Player } from './player';
import { Song } from './song';
import { SongQueue } from './song_queue';

export async function addSong(msg: Discord.Message, args: string[]) {
    if (args.length != 1) {
        return msg.channel.send("Please supply the url only.");
    }
    const url = args[0];
    const song = await Song.fromUrl(url);
    SongQueue.enqueue(song);
    msg.channel.send(`${song.title} has been added to the queue.`);
    SongQueue.printSongs();
    Player.playNextSong(msg.channel);
}