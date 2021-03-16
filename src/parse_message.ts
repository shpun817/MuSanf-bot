import Discord = require('discord.js');
import { joinVoiceChannel } from './join_channel';
import { addSong } from './msg_func/add_song';
import { nextSong } from './msg_func/next_song';
import { reset } from './msg_func/reset';
import { setVolume } from './msg_func/set_volume';
import { showQueue } from './msg_func/show_queue';
import { shuffleQueue } from './msg_func/shuffle_queue';

const prefix = '$';

interface Command {
    key: string;
    alias?: string[];
    func: (msg: Discord.Message, args: string[]) => (Promise<Discord.Message> | Promise<void> | void);
}

const commands: Command[] = [
    {key: "play", alias: ["p"], func: addSong},
    {key: "next", alias: ["n"], func: nextSong},
    {key: "reset", alias: ["r"], func: reset},
    {key: "volume", alias: ["v"], func: setVolume},
    {key: "queue", alias: ["q"], func: showQueue},
    {key: "shuffle", alias: ["s"], func: shuffleQueue},
];

export async function parseMessage(msg: Discord.Message) {
    if (msg.author.bot) {
        return;
    }
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    const inputLine = msg.content.substring(1).split(' ');
    commands.forEach(async (command) => {
        const keys = command.alias? [command.key, ...command.alias] : [command.key];
        if (keys.includes(inputLine[0])) {
            if (await joinVoiceChannel(msg)) {
                await command.func(msg, inputLine.slice(1));
            } else {
                console.log("Command blocked by lack of voice channel");
            }
        }
    });
}