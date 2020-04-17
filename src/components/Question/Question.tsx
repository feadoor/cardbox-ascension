import React, { useEffect, useState, useRef, KeyboardEvent } from 'react';
import './Question.css';

import Answers from '../Answers/Answers';
import Scramble from '../Scramble/Scramble';
import Timer from '../Timer/Timer';

import useEventEmitter from '../../hooks/useEventEmitter';

export interface QuestionProps {
    idx: number;
    scramble: string;
    answers: string[];
    duration: number;
    onQuestionEnded: (solved: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ idx, scramble, answers, duration, onQuestionEnded }) => {

    const [questionActive, setQuestionActive] = useState(true);
    const [solved, setSolved] = useState(true);
    const timerEmitter = useEventEmitter<void>();

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        containerRef.current && containerRef.current.focus();
    });

    useEffect(() => startQuestion(), [idx]);
    useEffect(() => timerEmitter.on('expire', () => answerQuestion(false)), []);

    const startQuestion = () => {
        setQuestionActive(true);
        timerEmitter.emit('start');
    };

    const answerQuestion = (response: boolean) => {
        setQuestionActive(false);
        setSolved(response);
        timerEmitter.emit('stop');
    };

    const endQuestion = () => {
        setQuestionActive(true);
        onQuestionEnded(solved);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (questionActive && e.key.toUpperCase() === ' ') answerQuestion(true);
        else if (questionActive && e.key.toUpperCase() === 'M') answerQuestion(false);
        else if (!questionActive && e.key.toUpperCase() === 'M') setSolved(!solved);
        else if (!questionActive && e.key.toUpperCase() === ' ') endQuestion();
    };

    return (
        <div className="question" ref={containerRef} tabIndex={-1} onKeyPress={handleKeyPress}>
            <div className="question__scramble-and-timer">
                <Scramble scramble={scramble}></Scramble>
                <Timer seconds={duration} eventEmitter={timerEmitter}></Timer>
            </div>
            {questionActive && <div className="question__response">
                <button className="question__response-button question__response-button--solved" onClick={() => answerQuestion(true)}>Solved</button>
                <button className="question__response-button question__response-button--missed" onClick={() => answerQuestion(false)}>Missed</button>
            </div>}
            {!questionActive && <div className="question__results">
                <Answers answers={answers}></Answers>
                <div className="question__confirm">
                    <button className={'question__response-button question__response-button--' + (solved ? 'solved' : 'missed')} onClick={() => setSolved(!solved)}>{solved ? 'Solved' : 'Missed'}</button>
                    <button className="question__response-button" onClick={() => endQuestion()}>Next question</button>
                </div>
            </div>}
        </div>
    );
}

export default Question;
