import aptodict from '../data/aptodict.json';

export const isInDictionary = (word: string): boolean =>
    indexInDictionary(word) !== -1;

export const suffixes = (word: string): string[] =>
    wordsBeginningWith(word).slice(1).map(w => w.slice(word.length))

const wordsBeginningWith = (word: string): string[] => {
    let index = indexInDictionary(word);
    if (index === -1) { return []; }

    const words = [];
    while (aptodict[index].startsWith(word)) {
        words.push(aptodict[index]);
        if (++index === aptodict.length) break;
    }

    return words;
}

const indexInDictionary = (word: string): number => {
    let lo = 0;
    let hi = aptodict.length - 1;

    while (lo !== hi) {
        let mid = Math.floor((lo + hi - 1) / 2);
        if (aptodict[mid] === word) { return mid; }
        else if (aptodict[mid] > word) { hi = mid; }
        else { lo = mid + 1; }
    }

    return aptodict[lo] === word ? lo : -1;
}