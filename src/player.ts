import Discord = require('discord.js');
import ytdl = require('ytdl-core');
import { SongQueue } from './song_queue';

export class Player {
    static voiceChannelConnection: Discord.VoiceConnection = null;
    static dispatcher = null;

    // Output messages to msgChannel
    static async playNextSong(msgChannel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel) {
        const nextSong = SongQueue.dequeue();
        if (nextSong == undefined) {
            await msgChannel.send("The queue has been emptied.");
            return;
        }
        this.dispatcher = this.voiceChannelConnection
            .play(ytdl(nextSong.url))
            .on('finish', () => {
                // Play the next song recursively
                this.playNextSong(msgChannel);
            })
            .on("error", async err => {
                await msgChannel.send("Some error encountered in playing song.");
                console.error(err);
            });
        await msgChannel.send(`Now Playing: **${nextSong.title}**`);
    }
}