import React from 'react';

import QuickEdit from '../../components/QuickEdit/QuickEdit';
import { getCardbox, addWords } from '../../services/cardboxService';
import highprob from '../../data/highprob.json';
import highprob9 from '../../data/highprob9.json';
import fiveVowels from '../../data/5vowels.json';

const NetworkedQuickEdit: React.FC = () => {

    const actions = [
        {name: 'Add to High Probability', action: addToHighProb},
        {name: 'Add to High Probability Nines', action: addToHighProb9},
        {name: 'Add to 5 Vowels', action: addTo5Vowels}
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

const addTo5Vowels = () =>
    getCardbox('5 Vowels').then(cardbox => {
        const questionCount = cardbox.size;
        const wordsToAdd = fiveVowels.slice(questionCount, questionCount + 100).flatMap(ws => ws);
        return addWords('5 Vowels', wordsToAdd);
    })

export default NetworkedQuickEdit;
