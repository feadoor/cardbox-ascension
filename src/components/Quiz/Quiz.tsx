import React, { useState } from 'react';
import './Quiz.css';

import Question from '../Question/Question';

export interface QuizQuestion {
    scramble: string;
    answers: string[];
}

export interface QuizProps {
    questions: QuizQuestion[];
    duration: number;
    recycle: boolean;
    onQuestionEnded: (scramble: string, solved: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions: _questions, duration, recycle, onQuestionEnded }) => {

    const [questions, setQuestions] = useState(_questions);
    const [questionIdx, setQuestionIdx] = useState(0);

    const endQuestion = (solved: boolean) => {
        onQuestionEnded(questions[questionIdx].scramble, solved);
        if (!solved && recycle) setQuestions([...questions, newScramble(questions[questionIdx])]);
        setQuestionIdx(idx => idx + 1);
    };

    return (
        <div className="quiz">
            {questionIdx >= questions.length && <div className="quiz__ended">
                No more questions!
            </div>}
            {questionIdx < questions.length && <div className="quiz__question">
                <div className="quiz__heading">Question {questionIdx + 1} of {questions.length}</div>
                <Question idx={questionIdx} scramble={questions[questionIdx].scramble} answers={questions[questionIdx].answers} duration={duration} onQuestionEnded={endQuestion}></Question>
            </div>}
        </div>
    );
}

const newScramble = (question: QuizQuestion) => ({
    ...question,
    scramble: randomScramble(question.scramble)
});

const randomScramble = (letters: string) => {
    const lettersArr = [...letters];
    for (let idx = lettersArr.length - 1; idx > 0; idx -= 1) {
        const jdx = Math.floor(Math.random() * (idx + 1));
        [lettersArr[idx], lettersArr[jdx]] = [lettersArr[jdx], lettersArr[idx]];
    }
    return lettersArr.join('');
};

export default Quiz;
