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
        const wordsInCardbox = new Set(cardbox.words);
        const wordsToAdd = highprob.filter(ws => ws.some(word => !wordsInCardbox.has(word))).slice(0, 100).flatMap(ws => ws);
        return addWords('High Probability', cardbox.offset, wordsToAdd);
    })

const addToHighProb9 = () =>
    getCardbox('High Probability Nines').then(cardbox => {
        const wordsInCardbox = new Set(cardbox.words);
        const wordsToAdd = highprob9.filter(ws => ws.some(word => !wordsInCardbox.has(word))).slice(0, 100).flatMap(ws => ws);
        return addWords('High Probability Nines', cardbox.offset, wordsToAdd);
    })

const addTo5Vowels = () =>
    getCardbox('5 Vowels').then(cardbox => {
        const wordsInCardbox = new Set(cardbox.words);
        const wordsToAdd = fiveVowels.filter(ws => ws.some(word => !wordsInCardbox.has(word))).slice(0, 100).flatMap(ws => ws);
        return addWords('5 Vowels', cardbox.offset, wordsToAdd);
    })

export default NetworkedQuickEdit;
