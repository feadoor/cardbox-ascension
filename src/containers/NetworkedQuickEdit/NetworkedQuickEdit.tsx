import React from 'react';

import QuickEdit from '../../components/QuickEdit/QuickEdit';
import { getCardbox, addWords } from '../../services/cardboxService';
import highprob from '../../data/highprob.json';
import highprob9 from '../../data/highprob9.json';

const NetworkedQuickEdit: React.FC = () => {

    const actions = [
        {name: 'Add to High Probability', action: addToHighProb},
        {name: 'Add to High Probability Nines', action: addToHighProb9},
    ];

    return <QuickEdit actions={actions}></QuickEdit>
}

const addToHighProb = () =>
    getCardbox('High Probability').then(cardbox => {
        const questionCount = cardbox.size;
        const wordsToAdd = highprob.slice(questionCount, questionCount + 100).flatMap(ws => ws);
        return addWords('High Probability', wordsToAdd);
    })

const addToHighProb9 = () =>
    getCardbox('High Probability Nines').then(cardbox => {
        const questionCount = cardbox.size;
        const wordsToAdd = highprob9.slice(questionCount, questionCount + 100).flatMap(ws => ws);
        return addWords('High Probability Nines', wordsToAdd);
    })

export default NetworkedQuickEdit;
