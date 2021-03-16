import Discord = require('discord.js');
import { Player } from '../player';
import { Song } from '../song';
import { SongQueue } from '../song_queue';

export async function addSong(msg: Discord.Message, args: string[]) {
    if (args.length != 1) {
        await msg.channel.send("Please don't give me anything else than the URL.");
        return;
    }
    if (Player.voiceChannelConnection === null) {
        return;
    }
    const url = args[0];
    const song = await Song.fromUrl(url);
    if (song === null) {
        msg.reply("I can't add this song for some reason.");
    } else {
        SongQueue.enqueue(song);
        msg.channel.send(`**${song.title}** just squeezed in the queue. (${SongQueue.size()} in queue)`);
        SongQueue.printSongs();
        if (!Player.isPlaying()) {
            Player.playNextSong(msg);
        } 
    }
}