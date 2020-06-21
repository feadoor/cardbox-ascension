import firebase from './firebase';
import fb from 'firebase/app';

import conundrums from '../data/single_cons.json';

export interface Ascension {
    waiting: string[];
    solved: string[];
    unsolved: string[];
}

export const getAscension = (): Promise<Ascension> => {

    return firebase.firestore().runTransaction(transaction => {

        const startNewCycle = () => {
            const waitingConundrums = shuffle(conundrums.map(c => c[0]));
            transaction.set(firebase.firestore().doc('ascension/ascension'), {
                waiting: waitingConundrums,
                solved: [],
                unsolved: []
            });
        };

        const continueCurrentCycle = (ascension: Ascension) => {
            transaction.set(firebase.firestore().doc('ascension/ascension'), {
                waiting: ascension.unsolved,
                solved: ascension.solved,
                unsolved: []
            });
        }

        return transaction.get(firebase.firestore().doc('ascension/ascension')).then(doc => {
            if (!doc.exists) {
                startNewCycle();
            } else {
                const data = doc.data() as Ascension;
                if (data.waiting.length === 0) {
                    if (data.unsolved.length > 0) {
                        continueCurrentCycle(data);
                    } else {
                        startNewCycle();
                    }
                }
            }
        })
    })
    .then(() => firebase.firestore().doc('ascension/ascension').get())
    .then(doc => doc.data() as Ascension)
}

export const recordConundrumAsSolved = (conundrum: string): Promise<void> => {
    return firebase.firestore().doc('ascension/ascension').update({
        waiting: fb.firestore.FieldValue.arrayRemove(conundrum),
        solved: fb.firestore.FieldValue.arrayUnion(conundrum)
    });
}

export const recordConundrumAsUnsolved = (conundrum: string): Promise<void> => {
    return firebase.firestore().doc('ascension/ascension').update({
        waiting: fb.firestore.FieldValue.arrayRemove(conundrum),
        unsolved: fb.firestore.FieldValue.arrayUnion(conundrum)
    });
}

const shuffle = <T extends any>(items: T[]): T[] => {
    const arr = [...items];
    for (let idx = arr.length - 1; idx > 0; idx -= 1) {
        const jdx = Math.floor(Math.random() * (idx + 1));
        [arr[idx], arr[jdx]] = [arr[jdx], arr[idx]];
    }
    return arr;
}
