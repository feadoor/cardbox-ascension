import { useState } from 'react';
import { Emitter } from './useEventEmitter';

import useInterval from './useInterval';

export default function useTimer(seconds: number, emitter: Emitter<void>) {

    const [timeRemaining, setTimeRemaining] = useState(seconds);
    const [isRunning, setIsRunning] = useState(false);

    useInterval(() => {
        if (timeRemaining > 0) {
            setTimeRemaining(time => Math.max(0, time - 0.03));
        } else {
            setIsRunning(false);
            emitter.emit('expire');
        }
    }, isRunning ? 30 : null);

    const startTimer = () => {
        setTimeRemaining(seconds);
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    return { startTimer, stopTimer, timeRemaining };
}
