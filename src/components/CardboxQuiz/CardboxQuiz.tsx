import React from 'react';

import { Question } from '../../services/cardboxService';
import Quiz from '../Quiz/Quiz';

export interface CardboxQuizProps {
    questions: Question[];
    duration: number;
    onQuestionAnswered: (letters: string, solved: boolean) => void;
}

const CardboxQuiz: React.FC<CardboxQuizProps> = ({ questions, duration, onQuestionAnswered }) => {

    const quizQuestions = questions.map(question => ({
        scramble: randomScramble(question.letters),
        answers: question.answers
    }));

    return (
        <Quiz questions={quizQuestions} duration={duration} onQuestionEnded={(scramble, solved) => onQuestionAnswered(keyFromScramble(scramble), solved)}></Quiz>
    );
};

const randomScramble = (letters: string) => {
    const lettersArr = [...letters];
    for (let idx = lettersArr.length - 1; idx > 0; idx -= 1) {
        const jdx = Math.floor(Math.random() * (idx + 1));
        [lettersArr[idx], lettersArr[jdx]] = [lettersArr[jdx], lettersArr[idx]];
    }
    return lettersArr.join('');
};

const keyFromScramble = (scramble: string) => [...scramble].sort().join('');

export default CardboxQuiz;
