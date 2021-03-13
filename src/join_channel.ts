import Discord = require('discord.js');

export async function joinVoiceChannel(msg: Discord.Message) {
    const userVoiceChannel = msg.member.voice.channel;
    if (!userVoiceChannel) {
        return msg.reply(
            "please join a voice channel before playing music!"
        );
    }
    const permissions = userVoiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return msg.reply(
            "I don't have the permissions to join and speak in your channel!"
        );
    }
    console.log("Currently in", msg.client.voice.connections.size, "voice channels");
    return userVoiceChannel.join();
}