import { Song } from "./song";

export class SongQueue implements IQueue<Song> {
    // Singleton pattern
    private static instance: SongQueue = null;
    static getInstance() {
        if (SongQueue.instance == null) {
            SongQueue.instance = new SongQueue();
        }
        return SongQueue.instance;
    }

    private queue: Song[];

    enqueue(item: Song): void {
        this.queue.push(item);
    }
    dequeue(): Song | undefined {
        return this.queue.shift();
    }
    size(): number {
        return this.queue.length;
    }
}