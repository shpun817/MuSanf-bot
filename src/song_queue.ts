import { Song } from "./song";
import Discord = require('discord.js');

export class SongQueue {
    //Queue interface
    private static queue: Song[] = [];
    
    static clear(): void {
        this.queue = [];
    }

    static enqueue(item: Song): void {
        this.queue.push(item);
    }
    static dequeue(): Song | undefined {
        return this.queue.shift();
    }
    static size(): number {
        return this.queue.length;
    }
    static printSongs(): void {
        console.log(this.queue);
    }
}