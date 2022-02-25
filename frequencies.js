import { words, winners } from "./dictionary.js";
import { box } from "./utils.js";

const config = {
    vowels: true,
    winners: false,
    max: false
};

process.argv.map(arg => {
    const argParts = arg.split("=");
    const key = argParts[0];
    const value = argParts[1];
    switch (key) {
        case "novowels":
            config.vowels = false;
            break;
        case "winners":
            config.winners = true;
            break;
        case "max":
            config.max = parseInt(value, 10);
            break;
        default:
            break;
    }
});

const letterFrequency = letters =>
    letters.reduce((total, letter) => {
        total[letter] ? total[letter]++ : (total[letter] = 1);
        return total;
    }, {});

const sortFrequencies = frequencies =>
    Object.keys(frequencies)
        .map(key => ({
            letter: key,
            count: frequencies[key]
        }))
        .sort((a, b) => b.count - a.count);

const calculatePercentages = (totalCount, frequencies) =>
    frequencies.map(frequency => {
        const percentage =
            Math.round((frequency.count / totalCount) * 100) / 100;
        return { ...frequency, percentage };
    });

const display = letters =>
    letters.map(l => {
        const name = l.letter.toUpperCase();
        const percent = `${Math.round(l.percentage * 100)}%`;
        const block = ``.padStart(l.percentage * 100, "█");
        const count = l.count.toString().padStart(4, "0");
        const row = `${block} ${percent} (${count}) `;
        const tick = ":".padEnd(10, ".");
        const emptyRow = ``.padStart(100 - [...row].length, tick);
        const overflow = [...emptyRow].reverse().join("");
        return `${name} ${row}${overflow}`;
    });

const getFrequencies = (words, title) => {
    const allLetters = [...words.join("")];
    const includedLetters = config.vowels
        ? allLetters
        : allLetters.filter(l => !"aeiou".includes(l));
    const displayTitle = config.vowels ? title : `${title} (excluding vowels)`;
    const unsortedFrequencies = letterFrequency(includedLetters);
    const sortedFrequencies = sortFrequencies(unsortedFrequencies);
    const results = calculatePercentages(allLetters.length, sortedFrequencies);
    let body = display(results);
    if (config.max && results.length > config.max) {
        const limited = body.slice(0, config.max);
        const overflow = `+${results.length - config.max} more`;
        body = [...limited, overflow];
    }
    box([[displayTitle], body]);
};

const title = config.winners
    ? "Winning-words letter frequencies"
    : "Letter frequencies";
const inputWords = config.winners ? winners : words;
getFrequencies(inputWords, title);
