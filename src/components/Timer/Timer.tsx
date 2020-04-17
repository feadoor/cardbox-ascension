import React, { useEffect } from 'react';
import './Timer.css';

import useTimer from '../../hooks/useTimer';
import { Emitter } from '../../hooks/useEventEmitter';

export interface TimerProps {
    seconds: number;
    eventEmitter: Emitter<void>;
}

const Timer: React.FC<TimerProps> = ({ seconds, eventEmitter }) => {

    const { startTimer, stopTimer, timeRemaining } = useTimer(seconds, eventEmitter);
    useEffect(() => eventEmitter.on('start', () => startTimer()), []);
    useEffect(() => eventEmitter.on('stop', () => stopTimer()), []);

    return (
        <div className="timer">
            <div className="timer__progress" style={progressBarStyle(timeRemaining, seconds)}></div>
        </div>
    );
};

const progressBarStyle = (remaining: number, duration: number) => ({
    width: `${100 * remaining / duration}%`
});

export default Timer;
