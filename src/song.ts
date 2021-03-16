import ytdl = require("ytdl-core");

export class Song {
    title: string;
    url: string;
    length: number;

    constructor(title: string, url: string, length: number) {
        this.title = title;
        this.url = url;
        this.length = length;
    }

    getLengthFormatted(): string {
        const hour = Math.floor(this.length / (60*60));
        const min = Math.floor((this.length-(hour*60*60)) / 60);
        const sec = this.length - (hour*60*60) - (min*60);
        const padNum = (n: number) => n.toString().padStart(2, '0');

        const minString = padNum(min);
        const secString = padNum(sec);
        if (hour > 0) {
            return `${hour}:${minString}:${secString}`;
        } else {
            return `${minString}:${secString}`;
        }
    }

    static async fromUrl(url: string): Promise<Song | null> {
        try {
            const songInfo = await ytdl.getInfo(url);
            return new Song(
                songInfo.videoDetails.title,
                songInfo.videoDetails.video_url,
                parseInt(songInfo.videoDetails.lengthSeconds),
            );
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}