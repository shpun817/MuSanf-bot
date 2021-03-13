import Discord = require('discord.js');

const prefix = '$';

interface Command {
    key: string;
    func: (args: string[]) => (Promise<void> | void);
}

const commands: Command[] = [
    {key: "log", func: console.log}
];

export async function parseMessage(msg: Discord.Message) {
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    const inputLine = msg.content.substring(1).split(' ');
    commands.forEach(async (command) => {
        if (command.key === inputLine[0]) {
            await command.func(inputLine.slice(1));
        }
    });
}