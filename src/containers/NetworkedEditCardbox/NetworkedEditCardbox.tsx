import React from 'react';

import EditCardbox from '../../components/EditCardbox/EditCardbox';
import useAsyncRequest from '../../hooks/useAsyncRequest';
import { getCardbox, setDuration, addWords, setOffset,  } from '../../services/cardboxService';

export interface NetworkedEditCardboxProps {
    cardbox: string;
    afterChangesSaved: () => void;
}

const NetworkedEditCardbox: React.FC<NetworkedEditCardboxProps> = ({ cardbox, afterChangesSaved }) => {

    const saveChanges = (duration: number, offset: number, words: string[]) => Promise.all([
        setDuration(cardbox, duration),
        setOffset(cardbox, offset),
        addWords(cardbox, offset, words)
    ]).then(afterChangesSaved);

    const { doRequest, result, error, inProgress } = useAsyncRequest((cardbox: string) =>
        getCardbox(cardbox)
    );

    if (!inProgress && error === undefined && result === undefined) {
        doRequest(cardbox);
    }

    if (result === undefined) { return <div></div>; }

    return <EditCardbox cardbox={cardbox} duration={result.duration} offset={result.offset} onChangesSaved={saveChanges}></EditCardbox>
};

export default NetworkedEditCardbox;
