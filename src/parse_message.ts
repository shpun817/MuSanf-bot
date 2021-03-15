import Discord = require('discord.js');
import { joinVoiceChannel } from './join_channel';
import { addSong } from './add_song';

const prefix = '$';

interface Command {
    key: string;
    func: (msg: Discord.Message, args: string[]) => (Promise<Discord.Message> | void);
}

const commands: Command[] = [
    {key: "dummy", func: (...a: any) => {}},
    {key: "play", func: addSong},
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