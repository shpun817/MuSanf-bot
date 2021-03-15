import Discord = require('discord.js');
import { Player } from '../player';

export async function nextSong(msg: Discord.Message, args: string[]) {
    if (!Player.isPlaying()) {
        return msg.channel.send("No song is currently being played!");
    }
    Player.dispatcher.end();
}