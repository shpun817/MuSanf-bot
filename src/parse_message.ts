import Discord = require('discord.js');
import { joinVoiceChannel } from './join_channel';
import { addSong } from './msg_func/add_song';
import { nextSong } from './msg_func/next_song';
import { reset } from './msg_func/reset';
import { setVolume } from './msg_func/set_volume';

const prefix = '$';

interface Command {
    key: string;
    func: (msg: Discord.Message, args: string[]) => (Promise<Discord.Message> | void);
}

const commands: Command[] = [
    {key: "dummy", func: (...a: any) => {}},
    {key: "play", func: addSong},
    {key: "next", func: nextSong},
    {key: "reset", func: reset},
    {key: "volume", func: setVolume},
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
        if (command.key === inputLine[0]) {
            await joinVoiceChannel(msg);
            await command.func(msg, inputLine.slice(1));
        }
    });
}