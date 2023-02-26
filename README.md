# shevchenko

JavaScript бібліотека для відмінювання українських антропонімів / JavaScript library for declension of Ukrainian anthroponyms

## Документація / Documentation

[Українська](https://tooleks.github.io/shevchenko-js) / [English](https://tooleks.github.io/shevchenko-js/en.html)

## Встановлення / Installation

```bash
npm install --save shevchenko
```

## Приклад використання / Usage Example

```JavaScript
const input = {
  gender: 'masculine', // Grammatical gender: 'masculine' or 'feminine'.
  givenName: 'Тарас',
  patronymicName: 'Григорович',
  familyName: 'Шевченко'
};

// Available declension functions: inNominative, inGenitive, inDative, inAccusative, inAblative, inLocative, inVocative
const output = await shevchenko.inVocative(input);

console.log(output); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
```
