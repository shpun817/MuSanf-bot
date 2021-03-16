import Discord = require('discord.js');
import { Player } from '../player';

export async function nextSong(msg: Discord.Message, args: string[]) {
    if (!Player.isPlaying()) {
        return msg.channel.send("*Play* a song before you ask for the *next*, maybe?");
    }
    Player.dispatcher.end();
}