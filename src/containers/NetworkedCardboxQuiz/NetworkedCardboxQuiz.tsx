import React from 'react';

import { getDueQuestions, getCardbox, answerQuestion } from '../../services/cardboxService';
import useAsyncRequest from '../../hooks/useAsyncRequest';

import CardboxQuiz from '../../components/CardboxQuiz/CardboxQuiz';

export interface NetworkedCardboxQuizProps {
    cardbox: string;
}

const NetworkedCardboxQuiz: React.FC<NetworkedCardboxQuizProps> = ({ cardbox }) => {

    const { doRequest: doCardboxRequest, result: cardboxResult, error: cardboxError, inProgress: cardboxInProgress } = useAsyncRequest((cardbox: string) =>
        getCardbox(cardbox)
    )

    const { doRequest: doQuestionsRequest, result: questionsResult, error: questionsError, inProgress: questionsInProgress } = useAsyncRequest((cardbox: string) =>
        getDueQuestions(cardbox)
    );

    if (!cardboxInProgress && cardboxError === undefined && cardboxResult === undefined) {
        doCardboxRequest(cardbox);
    }

    if (!questionsInProgress && questionsError === undefined && questionsResult === undefined) {
        doQuestionsRequest(cardbox);
    }

    if (cardboxResult === undefined || questionsResult === undefined) { return <div></div>; }

    return <CardboxQuiz duration={cardboxResult.duration} questions={questionsResult} onQuestionAnswered={(letters, solved) => answerQuestion(cardboxResult.name, letters, solved)}></CardboxQuiz>;
};

export default NetworkedCardboxQuiz;
