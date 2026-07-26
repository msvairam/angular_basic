import { Injectable,  } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Broadcast {
    private channel: BroadcastChannel = new BroadcastChannel('app-channel');


    public send<T>(type: string, data: T) {
        this.channel.postMessage({type, data});
    }

    public listen<T>(callback: (message: T) => void) {
        this.channel.onmessage = (message: MessageEvent<T>) => {
            callback(message.data);
        }
    }

    public close() {
        this.channel.close();
    }

}