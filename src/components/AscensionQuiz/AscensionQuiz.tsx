import React from 'react';

import conundrums from '../../data/single_cons.json';

import Quiz from '../Quiz/Quiz';
import { Ascension } from '../../services/ascensionService';

export interface AscensionQuizProps {
    ascension: Ascension;
    duration: number;
    onQuestionAnswered: (conundrum: string, solved: boolean) => void;
}

const AscensionQuiz: React.FC<AscensionQuizProps> = ({ ascension, duration, onQuestionAnswered }) => {

    const quizQuestions = shuffle(ascension.waiting.map(con => ({
        scramble: randomScramble(con.split(',')[0]),
        answers: con.split(',')
    })));

    const lookupMap = Object.assign({}, ...conundrums.map(con => ({ [keyFromScramble(con[0])]: con.join(',') })));

    return (
        <Quiz questions={quizQuestions} duration={duration} recycle={false} onQuestionEnded={(scramble, solved) => onQuestionAnswered(lookupMap[keyFromScramble(scramble)], solved)}></Quiz>
    );
};

const shuffle = <T extends any>(items: T[]): T[] => {
    const arr = [...items];
    for (let idx = arr.length - 1; idx > 0; idx -= 1) {
        const jdx = Math.floor(Math.random() * (idx + 1));
        [arr[idx], arr[jdx]] = [arr[jdx], arr[idx]];
    }
    return arr;
}

const randomScramble = (letters: string) => {
    return shuffle([...letters]).join('');
};

const keyFromScramble = (scramble: string) => [...scramble].sort().join('');

export default AscensionQuiz;
