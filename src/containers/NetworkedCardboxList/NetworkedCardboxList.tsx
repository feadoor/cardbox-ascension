import React from 'react';

import CardboxList, { CardboxListProps } from '../../components/CardboxList/CardboxList';
import useAsyncRequest from '../../hooks/useAsyncRequest';
import { getCardboxes, hasQuestionsDue } from '../../services/cardboxService';

const NetworkedCardboxList: React.FC = () => {

    const { doRequest, result, error, inProgress } = useAsyncRequest<void, CardboxListProps['cardboxes'], undefined>(() =>
        getCardboxes().then(cardboxes => Promise.all(cardboxes.map(cardbox =>
            hasQuestionsDue(cardbox.name).then(due => ({ name: cardbox.name, size: cardbox.size, hasQuestionsDue: due}))
        )))
    );

    if (!inProgress && error === undefined && result === undefined) {
        doRequest();
    }

    if (result === undefined) { return <div></div>; }

    return <CardboxList cardboxes={result}></CardboxList>
}

export default NetworkedCardboxList;
