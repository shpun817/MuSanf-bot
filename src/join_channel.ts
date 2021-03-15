import Discord = require('discord.js');
import { Player } from './player';

// Returns true if bot successfully joins the voice channel of the author
export async function joinVoiceChannel(msg: Discord.Message) {
    const userVoiceChannel = msg.member.voice.channel;
    if (!userVoiceChannel) {
        await msg.reply(
            "please join a voice channel before playing music!"
        );
        return false;
    }
    const permissions = userVoiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        await msg.reply(
            "I don't have the permissions to join and speak in your channel!"
        );
        return false;
    }
    console.log("Currently in", msg.client.voice.connections.size, "voice channels");
    Player.voiceChannelConnection = await userVoiceChannel.join();
    // Deafen self
    await msg.guild.me.voice.setSelfDeaf(true);
    return true;
}