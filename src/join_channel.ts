import Discord = require('discord.js');
import { Player } from './player';

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
    Player.voiceChannelConnection = await userVoiceChannel.join();
    // Deafen self
    await msg.guild.me.voice.setSelfDeaf(true);
}