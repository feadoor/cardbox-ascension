import React from 'react';

import { Question } from '../../services/cardboxService';
import Quiz from '../Quiz/Quiz';

export interface CardboxQuizProps {
    questions: Question[];
    duration: number;
    onQuestionAnswered: (letters: string, solved: boolean) => void;
}

const CardboxQuiz: React.FC<CardboxQuizProps> = ({ questions, duration, onQuestionAnswered }) => {

    const quizQuestions = shuffle(questions.map(question => ({
        scramble: randomScramble(question.letters),
        answers: question.answers
    })));

    return (
        <Quiz questions={quizQuestions} duration={duration} recycle={true} onQuestionEnded={(scramble, solved) => onQuestionAnswered(keyFromScramble(scramble), solved)}></Quiz>
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

export default CardboxQuiz;
