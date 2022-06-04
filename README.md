## shevchenko

JavaScript бібліотека для відмінювання українських антропонімів / JavaScript library for declension of Ukrainian anthroponyms

### Документація / Documentation

[Українська](https://tooleks.github.io/shevchenko-js) / [English](https://tooleks.github.io/shevchenko-js/en.html)

### Встановлення / Installation

```bash
npm install --save shevchenko
```

### Приклад використання / Usage Example

```JavaScript
const anthroponym = {
  gender: 'male', // or 'female'
  firstName: 'Тарас',
  middleName: 'Григорович',
  lastName: 'Шевченко'
};

const result = shevchenko.inVocative(anthroponym);

console.log(result); // { gender: "male", firstName: "Тарасе", middleName: "Григоровичу", lastName: "Шевченку" }
```
