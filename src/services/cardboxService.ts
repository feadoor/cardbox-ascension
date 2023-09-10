import firebase from './firebase';
import fb from 'firebase/app';
import { isInDictionary } from './dictionaryService';

export interface Cardbox {
    name: string;
    size: number;
    duration: number;
    offset: number;
    words: string[];
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

export const hasQuestionsDue = (cardbox: string, offset: number): Promise<boolean> =>
    firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions')
        .where('due', '<=', getDueTimestamp(offset)).limit(1).get().then(querySnapshot =>
            !querySnapshot.empty
        )

export const getDueQuestions = (cardbox: string, offset: number): Promise<Question[]> =>
    firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions')
        .where('due', '<=', getDueTimestamp(offset)).get().then(querySnapshot =>
            querySnapshot.docs.map(doc => ({
                ...doc.data(), 
                answers: doc.data().answers.filter(isInDictionary), 
                letters: doc.id
            } as Question))
        .filter(q => q.answers.length > 0))

export const createCardbox = (name: string, duration: number): Promise<void> => {
    const docRef = firebase.firestore().collection('cardboxes').doc(name);
    return firebase.firestore().runTransaction(transaction =>
        transaction.get(docRef).then(doc => {
            if (!doc.exists) {
                transaction.set(docRef, { size: 0, duration: duration, offset: 0, words: [] });
            }
        })
    );
}

export const setDuration = (cardbox: string, duration: number): Promise<void> => {
    return firebase.firestore().collection('cardboxes').doc(cardbox).update({ duration: duration });
}

export const setOffset = (cardbox: string, offset: number): Promise<void> => {
    return firebase.firestore().collection('cardboxes').doc(cardbox).update({ offset: offset });
}

export const addWords = (cardbox: string, offset: number, words: string[]): Promise<void[]> => {
    const wordsByKey = groupWordsByKey(words);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() - offset);
    return Promise.all(Object.keys(wordsByKey).map(key =>
        firebase.firestore().runTransaction(transaction => {
            const cardboxRef = firebase.firestore().collection('cardboxes').doc(cardbox);
            const docRef = firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions').doc(key);
            return transaction.get(docRef).then(doc => {
                if (!doc.exists) {
                    transaction.update(cardboxRef, { size: fb.firestore.FieldValue.increment(1), words: fb.firestore.FieldValue.arrayUnion(...wordsByKey[key])});
                    transaction.set(docRef, { answers: wordsByKey[key], asked: 0, answeredCorrectly: 0, level: 0, due: fb.firestore.Timestamp.fromDate(dueDate) });
                } else {
                    const existingAnswers = (doc.data() as Question).answers;
                    if (wordsByKey[key].some(ans => !existingAnswers.includes(ans))) {
                        transaction.update(cardboxRef, { words: fb.firestore.FieldValue.arrayUnion(wordsByKey[key])});
                        transaction.update(docRef, { answers: dedup([...existingAnswers, ...wordsByKey[key]]), due: fb.firestore.Timestamp.fromDate(dueDate) });
                    }
                }
            })
        })
    ));
}

export const answerQuestion = (cardbox: string, offset: number, letters: string, correct: boolean) => {
    const docRef = firebase.firestore().collection('cardboxes').doc(cardbox).collection('questions').doc(letters);
    return firebase.firestore().runTransaction(transaction =>
        transaction.get(docRef).then(doc => {
            const data = doc.data() as Question;
            const newLevel = correct ? data.level + 1 : 0;
            const newDueDate = getNewDueDate(newLevel, offset);
            const newAsked = data.asked + 1;
            const newAnsweredCorrectly = correct ? data.answeredCorrectly + 1 : data.answeredCorrectly;
            transaction.update(docRef, { level: newLevel, due: newDueDate, asked: newAsked, answeredCorrectly: newAnsweredCorrectly });
        })
    );
}

const getDueTimestamp = (offset: number) => {
    const dueDate = new Date();
    if (dueDate.getHours() >= 5) dueDate.setDate(dueDate.getDate() + 1);
    dueDate.setDate(dueDate.getDate() - offset);
    dueDate.setHours(5, 0, 0, 0);
    return fb.firestore.Timestamp.fromDate(dueDate);
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
};

const getNewDueDate = (newLevel: number, offset: number) => {
    const timeNow = fb.firestore.Timestamp.now();
    const secondsInDay = 60 * 60 * 24;
    const upperDays = newLevel === 0 ? 0 : Math.pow(2, Math.min(newLevel, 9) - 1);
    const lowerDays = newLevel === 0 ? 0 : Math.max(1, Math.floor(upperDays * 2 / 3));
    const daysToAdd = Math.floor(Math.random() * (upperDays - lowerDays + 1)) + lowerDays;
    return new fb.firestore.Timestamp(timeNow.seconds + secondsInDay * (daysToAdd - offset), timeNow.nanoseconds);
};
