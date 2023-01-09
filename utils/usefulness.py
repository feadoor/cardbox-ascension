import csv
import json

all_words = []
high_probability = []
high_probability_nines = []
five_vowels = []

with open('usefulness.csv') as usefulness_csv:
    reader = csv.reader(usefulness_csv)
    for rank, letters, words_str, length, count, usefulness, best_word, stems in reader:
        words = words_str.split('/')
        if len([c for c in letters if c in 'AEIOU']) > 5 or len([c for c in letters if c not in 'AEIOU']) > 6:
            continue
        elif len([c for c in letters if c in 'AEIOU']) == 5:
            five_vowels.append(words)
        elif len(letters) <= 8:
            high_probability.append(words)
        elif len(letters) == 9:
            high_probability_nines.append(words)

with open('aptodict.txt') as aptodict:
    for word in aptodict:
        word = word.strip()
        if len(word) <= 9 and len([c for c in word if c in 'AEIOU']) <= 5 and len([c for c in letters if c not in 'AEIOU']) <= 6:
            all_words.append(word)

with open('highprob.json', 'w') as highprob:
    json.dump(high_probability, highprob)

with open('highprob9.json', 'w') as highprob9:
    json.dump(high_probability_nines, highprob9)

with open('5vowels.json', 'w') as fivevowels:
    json.dump(five_vowels, fivevowels)

with open('aptodict.json', 'w') as aptodict:
    json.dump(all_words, aptodict)
