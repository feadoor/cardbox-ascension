import React from 'react';

import { match } from 'react-router-dom';
import NetworkedCardboxQuiz from '../../containers/NetworkedCardboxQuiz/NetworkedCardboxQuiz';

export interface CardboxQuizPageParams {
    cardbox: string;
}

export interface CardboxQuizPageProps {
    match: match<CardboxQuizPageParams>;
}

const CardboxQuizPage: React.FC<CardboxQuizPageProps> = ({ match }) => {
    return (
        <NetworkedCardboxQuiz cardbox={match.params.cardbox}></NetworkedCardboxQuiz>
    );
};

export default CardboxQuizPage;
