import React from 'react';
import './Answers.css';

export interface AnswersProps {
    answers: string[];
}

const Answers: React.FC<AnswersProps> = ({ answers }) => {
    return (
        <div className="answers">
            <ul className="answers__list">
                {answers.map((ans, idx) =>
                    <li key={idx} className="answers__answer">{ans}</li>
                )}
            </ul>
        </div>
    );
};

export default Answers;
