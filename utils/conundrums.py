from collections import defaultdict
import json

all_words = []
with open('aptodict.txt', 'r') as f:
    for line in f:
        all_words.append(line.strip())

words = set(all_words)

def is_valid_conundrum(word, words):
    if word[-1] == 'S' and word[-2] != 'S' and word[:-1] in words:
        return False
    if word[-2:] == 'ES' and (word[-3] == 'S' or word[-4:-2] == 'CH' or word[-4:-2] == 'SH' or word[-3] == 'X' or word[-3] == 'Z' or word[-3] == 'O') and word[:-2] in words:
        return False
    if word[-3:] == 'IES' and (word[:-3] + 'Y' in words or word[:-3] + 'EY' in words):
        return False
    return True

grouped_nines = defaultdict(list)
for nine in (w for w in words if len(w) == 9):
    letters = str(sorted(nine))
    grouped_nines[letters].append((nine, is_valid_conundrum(nine, words)))

single_conundrums = []
double_conundrums = []

for group in grouped_nines.values():
    if len(group) == 1 and group[0][1]:
        single_conundrums.append([group[0][0]])
    elif len(group) == 2 and (group[0][1] or group[1][1]):
        double_conundrums.append((group[0][0], group[1][0]))

with open('single_cons.json', 'w') as f:
    json.dump(single_conundrums, f)

with open('double_cons.json', 'w') as f:
    json.dump(double_conundrums, f)
