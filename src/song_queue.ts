import { Song } from "./song";

export class SongQueue {
    //Queue interface
    private static queue: Song[] = [];

    static getQueue(): readonly Song[] {
        return this.queue;
    }
    
    static clear(): void {
        this.queue = [];
    }

    static shuffle(): void {
        for (let i = 0; i < this.queue.length; ++i) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
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