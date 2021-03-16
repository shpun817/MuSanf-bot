import Discord = require('discord.js');
import internal = require('node:stream');
import ytdl = require('ytdl-core');
import { reset } from './msg_func/reset';
import { SongQueue } from './song_queue';

export class Player {
    static voiceChannelConnection: Discord.VoiceConnection = null;
    static dispatcher: Discord.StreamDispatcher = null; // A different dispatcher will be assigned for each song
    static volume: number = 40; // The (running) default volume, will be mapped from [0,100] to [0,1]

    private static idleTimeout: NodeJS.Timeout = null;

    static reset() {
        this.voiceChannelConnection = null;
        this.dispatcher = null;
        if (this.idleTimeout !== null) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
    }

    static isPlaying() {
        return this.dispatcher !== null;
    }

    static getVolume(): number {
        if (((this.volume/100) - this.dispatcher.volumeLogarithmic) > 0.01) {
            console.error("Error in Player: volume property and dispatcher volume do not agree!");
            console.error(`Volume property is ${this.volume} and dispatcher volume is ${this.dispatcher.volumeLogarithmic}.`);
        }
        return this.volume;
    }

    static setVolume(volume?: number) {
        if (volume !== undefined) {
            this.volume = volume;
        }
        this.dispatcher?.setVolumeLogarithmic(this.volume/100); // Change volume of the current dispatcher
    }

    // Output messages to msg.channel
    static async playNextSong(msg: Discord.Message) {
        const nextSong = SongQueue.dequeue();
        if (nextSong === undefined) {
            this.dispatcher = null;
            await msg.channel.send("The queue has been emptied.");
            await msg.channel.send("Disconnecting in 30 seconds...");
            if (this.idleTimeout !== null) {
                clearTimeout(this.idleTimeout);
            }
            this.idleTimeout = setTimeout(async () => {
                await msg.channel.send("Au Revoir!");
                reset(msg, ['player', 'queue', 'silent']);
            }, 30*1000);
            return;
        }
        if (this.voiceChannelConnection === null) {
            await msg.channel.send("No voice channel connection. Disconnect me and try again.");
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
        if (this.idleTimeout !== null) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
        this.dispatcher = this.voiceChannelConnection
            .play(songInput)
            .on('finish', () => {
                // Play the next song recursively
                this.playNextSong(msg);
            })
            .on("error", async err => {
                this.dispatcher = null;
                await msg.channel.send(`Something went wrong when I try to play **${nextSong.title}**.`);
                console.error(err);
                this.playNextSong(msg);
            });
        this.setVolume();
        await msg.channel.send(`Coming up next: **${nextSong.title}**`);
    }
}