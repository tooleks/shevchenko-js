## shevchenko

JavaScript бібліотека для відмінювання українських прізвищ, імен та по батькові / JavaScript library to inflect Ukrainian first, middle and last names

* [Демо](https://tooleks.github.io/shevchenko-js/index.html) / [Demo](https://tooleks.github.io/shevchenko-js/en.html)
* [Документація](https://github.com/tooleks/shevchenko-js/wiki/%5Buk%5D-%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F) / [Documentation](https://github.com/tooleks/shevchenko-js/wiki/%5Ben%5D-Documentation)
* [Ліцензія](https://github.com/tooleks/shevchenko-js/blob/master/LICENSE) / [License](https://github.com/tooleks/shevchenko-js/blob/master/LICENSE)
* [Принцип роботи](https://github.com/tooleks/shevchenko-js/wiki/%5Buk%5D-%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8) / [How It Works?](https://github.com/tooleks/shevchenko-js/wiki/%5Ben%5D-How-It-Works%3F)

### Встановлення / Installation

```bash
npm install --save shevchenko
```

### Використання / Usage

```JavaScript
const anthroponym = {
    gender: 'male', // or 'female'
    firstName: 'Тарас',
    middleName: 'Григорович',
    lastName: 'Шевченко'
};

const result = shevchenko.inVocative(anthroponym);

console.log(result); // { gender: 'male', firstName: 'Тарасе', middleName: 'Григоровичу', lastName: 'Шевченку' }
```
