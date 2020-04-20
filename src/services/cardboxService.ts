import firebase from './firebase';
import fb from 'firebase/app';

export interface Cardbox {
    name: string;
    size: number;
    duration: number;
}

export interface Question {
    letters: string;
    answers: string[];
    asked: number;
    answeredCorrectly: number;
    level: number;
    due: Date;
}

export const getCardbox = (cardbox: string): Promise<Cardbox> =>
    firebase.firestore().collection('cardboxes').doc(cardbox).get().then(doc => ({
        ...doc.data(),
        name: doc.id
    } as Cardbox));

export const getCardboxes = (): Promise<Cardbox[]> =>
    firebase.firestore().collection('cardboxes').get().then(querySnapshot =>
        querySnapshot.docs.map(doc => ({
            ...doc.data(),
            name: doc.id
        } as Cardbox))
    );

export const hasQuestionsDue = (cardbox: string): Promise<boolean> =>
    firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions')
        .where('due', '<=', fb.firestore.Timestamp.now()).limit(1).get().then(querySnapshot =>
            !querySnapshot.empty
        );

export const getDueQuestions = (cardbox: string): Promise<Question[]> =>
    firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions')
        .where('due', '<=', fb.firestore.Timestamp.now()).get().then(querySnapshot =>
            querySnapshot.docs.map(doc => ({
                ...doc.data(),
                letters: doc.id
            } as Question))
        );

export const createCardbox = (name: string, duration: number): Promise<void> => {
    const docRef = firebase.firestore().collection('cardboxes').doc(name);
    return firebase.firestore().runTransaction(transaction =>
        transaction.get(docRef).then(doc => {
            if (!doc.exists) {
                transaction.set(docRef, { size: 0, duration: duration });
            }
        })
    );
}

export const setDuration = (cardbox: string, duration: number): Promise<void> => {
    return firebase.firestore().collection('cardboxes').doc(cardbox).update({ duration: duration });
}

export const addWords = (cardbox: string, words: string[]): Promise<void[]> => {
    const wordsByKey = groupWordsByKey(words);
    return Promise.all(Object.keys(wordsByKey).map(key =>
        firebase.firestore().runTransaction(transaction => {
            const cardboxRef = firebase.firestore().collection('cardboxes').doc(cardbox);
            const docRef = firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions').doc(key);
            return transaction.get(docRef).then(doc => {
                if (!doc.exists) {
                    transaction.update(cardboxRef, { size: fb.firestore.FieldValue.increment(1) });
                    transaction.set(docRef, { answers: wordsByKey[key], asked: 0, answeredCorrectly: 0, level: 0, due: fb.firestore.Timestamp.now() });
                } else {
                    const existingAnswers = (doc.data() as Question).answers;
                    transaction.update(docRef, { answers: dedup([...existingAnswers, ...wordsByKey[key]]) });
                }
            })
        })
    ));
}

export const answerQuestion = (cardbox: string, letters: string, correct: boolean) => {
    const docRef = firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions').doc(letters);
    return firebase.firestore().runTransaction(transaction =>
        transaction.get(docRef).then(doc => {
            const data = doc.data() as Question;
            const newLevel = correct ? data.level + 1 : 0;
            const newDueDate = getNewDueDate(newLevel);
            const newAsked = data.asked + 1;
            const newAnsweredCorrectly = correct ? data.answeredCorrectly + 1 : data.answeredCorrectly;
            transaction.update(docRef, { level: newLevel, due: newDueDate, asked: newAsked, answeredCorrectly: newAnsweredCorrectly });
        })
    );
}

const dedup = (words: string[]): string[] => [...new Set(words)].sort();

const groupWordsByKey = (words: string[]): {[key: string]: string[]} => {
    const groups: {[key: string]: string[]} = {};
    words.forEach(word => {
        const key = [...word].sort().join('');
        if (groups[key] === undefined) groups[key] = [];
        groups[key].push(word);
    });
    return groups;
}

const getNewDueDate = (newLevel: number) => {
    const timeNow = fb.firestore.Timestamp.now();
    const secondsInDay = 60 * 60 * 24;
    const daysToAdd = newLevel === 0 ? 0 : Math.pow(2, Math.min(newLevel, 9) - 1);
    return new fb.firestore.Timestamp(timeNow.seconds + secondsInDay * daysToAdd, timeNow.nanoseconds);
}
