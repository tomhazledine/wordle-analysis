import { words } from "./dictionary.js";
import { box } from "./utils.js";

const config = {
    inc: "",
    exc: "",
    max: 10
};

process.argv.map(arg => {
    const argParts = arg.split("=");
    const key = argParts[0];
    const value = argParts[1];
    config[key] = value;
});

// Exclude isograms from word list
const isIsogram = string => !/(.).*\1/.test(string);
const noRepeatedLetters = words.filter(isIsogram);

// Find all words that do not contain any of the input letters.
const exclusiveMatches = (input, words) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const allowedLetters = [...input].reduce(
        (a, l) => a.replace(l, ""),
        alphabet
    );
    const match = new RegExp(`^[${allowedLetters}]+$`);
    const matches = words.filter(word => match.test(word));
    return matches;
};

// Find words that contain *all* input letters/
const inclusiveMatches = (input, words) => {
    const letters = [...input];
    const matches = words.filter(word => {
        const hits = letters
            .map(letter => word.includes(letter))
            .filter(hit => hit);
        return hits.length == letters.length;
    });
    return matches;
};

const countVowels = (word, vowels = "aeiou") => {
    const letters = [...word.toLowerCase()];
    const justVowels = letters.filter(char => vowels.indexOf(char) > -1);
    return justVowels.length;
};

const orderByVowels = words =>
    words
        .map(word => ({ word, vowelCount: countVowels(word) }))
        .sort((a, b) => (a.vowelCount > b.vowelCount ? -1 : 1))
        .map(object => object.word)
        .reverse();

const inclusive = inclusiveMatches(config.inc, noRepeatedLetters);

let meta = [
    `${words.length} total words.`,
    `${noRepeatedLetters.length} without duplicate letters.`
];

if ([...config.inc].length > 0) {
    meta = [
        ...meta,
        `Must contain these letters: ${config.inc} (${inclusive.length})`
    ];
}

let results = inclusive;

if (config.exc) {
    const exclusive = exclusiveMatches(config.exc, inclusive);
    results = orderByVowels(exclusive);
    meta = [
        ...meta,
        `Must NOT contain these letters: ${config.exc} (${results.length})`
    ];
}

let output = results;

if (results.length > config.max) {
    const firstTen = results.slice(0, config.max);
    output = [...firstTen, `(+ ${results.length - config.max} more)`];
}

box([["WORDFINDER"], meta, output]);
