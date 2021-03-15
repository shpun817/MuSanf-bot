import Discord = require('discord.js');
import internal = require('node:stream');
import ytdl = require('ytdl-core');
import { SongQueue } from './song_queue';

export class Player {
    static voiceChannelConnection: Discord.VoiceConnection = null;
    static dispatcher: Discord.StreamDispatcher = null;

    static reset() {
        this.voiceChannelConnection = null;
        this.dispatcher = null;
    }

    static isPlaying() {
        return this.dispatcher !== null;
    }

    // Output messages to msg.channel
    static async playNextSong(msg: Discord.Message) {
        const nextSong = SongQueue.dequeue();
        if (nextSong === undefined) {
            this.dispatcher = null;
            await msg.channel.send("The queue has been emptied.");
            return;
        }
        if (this.voiceChannelConnection === null) {
            return;
        }
        let songInput: internal.Readable;
        try {
            songInput = ytdl(nextSong.url);
        } catch (e) {
            console.error(e);
            await msg.channel.send(`**${nextSong.title}** cannot be played.`);
            return;
        }
        this.dispatcher = this.voiceChannelConnection
            .play(songInput)
            .on('finish', () => {
                // Play the next song recursively
                this.playNextSong(msg);
            })
            .on("error", async err => {
                this.dispatcher = null;
                await msg.channel.send("Some error encountered in playing song.");
                console.error(err);
            });
        this.dispatcher.setVolume(4 / 100);
        await msg.channel.send(`Now Playing: **${nextSong.title}**`);
    }
}