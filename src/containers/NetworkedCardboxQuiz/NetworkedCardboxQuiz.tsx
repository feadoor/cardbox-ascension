import React from 'react';

import { getDueQuestions, getCardbox, answerQuestion } from '../../services/cardboxService';
import useAsyncRequest from '../../hooks/useAsyncRequest';

import CardboxQuiz from '../../components/CardboxQuiz/CardboxQuiz';

export interface NetworkedCardboxQuizProps {
    cardbox: string;
}

const NetworkedCardboxQuiz: React.FC<NetworkedCardboxQuizProps> = ({ cardbox }) => {

    const { doRequest, result, error, inProgress } = useAsyncRequest((cardbox: string) => 
        getCardbox(cardbox).then(cardboxResult => getDueQuestions(cardbox, cardboxResult.offset).then(questionsResult => ({
            cardbox: cardboxResult,
            questions: questionsResult,
        })))
    )

    if (!inProgress && error === undefined && result === undefined) {
        doRequest(cardbox);
    }

    if (result === undefined) { return <div></div>; }

    return <CardboxQuiz duration={result.cardbox.duration} questions={result.questions} onQuestionAnswered={(letters, solved) => answerQuestion(result.cardbox.name, result.cardbox.offset, letters, solved)}></CardboxQuiz>;
};

export default NetworkedCardboxQuiz;
