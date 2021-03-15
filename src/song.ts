import ytdl = require("ytdl-core");

export class Song {
    title: string;
    url: string;

    constructor(title, url) {
        this.title = title;
        this.url = url;
    }

    static async fromUrl(url: string): Promise<Song | null> {
        try {
            const songInfo = await ytdl.getInfo(url);
            return new Song(
                songInfo.videoDetails.title,
                songInfo.videoDetails.video_url,
            );
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}