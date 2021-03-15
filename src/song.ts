import ytdl = require("ytdl-core");

async function getSongInfo(url: string) {
    return ytdl.getInfo(url);
}

export class Song {
    title: string;
    url: string;

    constructor(title, url) {
        this.title = title;
        this.url = url;
    }

    static async fromUrl(url: string) {
        const songInfo = await getSongInfo(url);
        return new Song(
            songInfo.videoDetails.title,
            songInfo.videoDetails.video_url,
        );
    }
}