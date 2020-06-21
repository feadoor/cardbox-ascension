import React from 'react';

import { getAscension, recordConundrumAsSolved, recordConundrumAsUnsolved } from '../../services/ascensionService';
import useAsyncRequest from '../../hooks/useAsyncRequest';

import AscensionQuiz from '../../components/AscensionQuiz/AscensionQuiz';

const NetworkedAscensionQuiz: React.FC = () => {

    const { doRequest, result, error, inProgress } = useAsyncRequest(() =>
        getAscension()
    );

    if (!inProgress && error === undefined && result === undefined) {
        doRequest(1);
    }

    if (result === undefined) { return <div></div>; }

    const answerQuestion = (conundrum: string, solved: boolean) => {
        if (solved) recordConundrumAsSolved(conundrum);
        else recordConundrumAsUnsolved(conundrum);
    }

    return (
        <AscensionQuiz duration={10} ascension={result} onQuestionAnswered={answerQuestion}></AscensionQuiz>
    );
};

export default NetworkedAscensionQuiz;
