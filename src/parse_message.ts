import Discord = require('discord.js');
import { joinVoiceChannel } from './join_channel';
import { addSong } from './msg_func/add_song';
import { changeBitrate } from './msg_func/change_bitrate';
import { changeIdle } from './msg_func/change_idle';
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
    {key: "bitrate", alias: ["b"], func: changeBitrate},
    {key: "idle", alias: ["i"], func: changeIdle},
];

export async function parseMessage(msg: Discord.Message) {
    if (msg.author.bot) {
        return;
    }
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    // The first token is the command key/alias and the rest are arguments
    const inputLine = msg.content.substring(1).split(' ');
    commands.forEach(async (command) => {
        if (command.key === inputLine[0] || command.alias?.includes(inputLine[0])) {
            if (await joinVoiceChannel(msg)) {
                await command.func(msg, inputLine.slice(1));
            } else {
                console.log("Command blocked by lack of voice channel");
            }
        }
    });
}