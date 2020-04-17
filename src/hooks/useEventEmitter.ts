import { useState } from 'react';

export class Emitter<T> {

    private callbacks: {[s: string]: ((_: T) => void)[]} = {};

    public emit(event: string, data: T): void {
        this.callbacks[event] && this.callbacks[event].forEach(cb => cb(data));
    }

    public on(event: string, cb: (_: T) => void) {
        if (!this.callbacks[event]) this.callbacks[event] = [];
        this.callbacks[event].push(cb);
    }
}

export default function useEventEmitter<T>() {
    const eventEmitter = useState(new Emitter<T>())[0];
    return eventEmitter;
}
