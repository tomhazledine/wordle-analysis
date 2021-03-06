# Wordle Analysis

Some small node scripts to analyse the words in the dictionary used by the online puzzle game [Wordle](https://www.powerlanguage.co.uk/wordle/). Read more about these scripts and how they were made [in the article on my blog](https://tomhazledine.com/wordle-node-script).

## Usage

`node frequencies` will print a graph of letter-frequencies to the terminal console.

-   `node frequencies novowels` will exclude vowels from the frequency results.
-   `node frequencies winners` will only use the list of "winning" Wordle words.
-   `node frequencies max=10` will only include the top 10 most frequent letters in the graph.

`node wordfinder` will print a list of words from the Wordle dictionary that match certain criteria. Include and exclude letters with the `inc` and `exc` arguments. Result are sorted by the number of vowels (fewest first).

-   `node wordfinder inc=abc` will list all words from the dictionary that include the letters `a`, `b`, and `c`.
-   `node wordfinder exc=abc` will list all words from the dictionary that do not include the letters `a`, `b`, or `c`.
-   `node wordfinder max=10` will limit the displayed list to 10 results.

## Examples

`node frequencies novowels max=6`

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Letter frequencies (excluding vowels)                                                                  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ S ██████████ 10% (6665) .......:.........:.........:.........:.........:.........:.........:.........: │
│ R ██████ 6% (4158) ..:.........:.........:.........:.........:.........:.........:.........:.........: │
│ L █████ 5% (3371) ...:.........:.........:.........:.........:.........:.........:.........:.........: │
│ T █████ 5% (3295) ...:.........:.........:.........:.........:.........:.........:.........:.........: │
│ N █████ 5% (2952) ...:.........:.........:.........:.........:.........:.........:.........:.........: │
│ D ████ 4% (2453) ....:.........:.........:.........:.........:.........:.........:.........:.........: │
│ +15 more                                                                                               │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

`node wordfinder inc=lcph exc=trnd`

```
┌──────────────────────────────────────────┐
│ WORDFINDER                               │
├──────────────────────────────────────────┤
│ 12972 total words.                       │
│ 8322 without duplicate letters.          │
│ Must contain these letters: lcph (2)     │
│ Must NOT contain these letters: trnd (2) │
├──────────────────────────────────────────┤
│ pilch                                    │
│ chelp                                    │
└──────────────────────────────────────────┘
```
