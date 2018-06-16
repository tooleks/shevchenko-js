## shevchenko - JavaScript бібліотека для відмінювання українських прізвищ, імен та по батькові 

## shevchenko - The JavaScript library to inflect Ukrainian first, middle and last names

* [Демо](http://shevchenko-js.tooleks.com/?lang=uk#demo) / [Demo](http://shevchenko-js.tooleks.com/?lang=en#demo)
* [Документація](https://github.com/tooleks/shevchenko-js/wiki/%5Buk%5D-%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F) / [Documentation](https://github.com/tooleks/shevchenko-js/wiki/%5Ben%5D-Documentation)
* [Ліцензія](https://github.com/tooleks/shevchenko-js/blob/master/LICENSE) / [License](https://github.com/tooleks/shevchenko-js/blob/master/LICENSE)
* [Принцип роботи](https://github.com/tooleks/shevchenko-js/wiki/%5Buk%5D-%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8)

### Встановлення / Installation

```bash
npm install --save shevchenko
```

### Використання / Usage

```JavaScript
var person = {
    gender: "male", // or "female"
    firstName: "Тарас",
    middleName: "Григорович",
    lastName: "Шевченко"
};

var result = shevchenko.inVocative(person);

console.log(result); // {firstName: 'Тарасе', middleName: 'Григоровичу', lastName: 'Шевченку'}
```

### Огляд / API Overview

```JavaScript
shevchenko.inNominative(person); // Відмінити в називному відмінку.
shevchenko.inGenitive(person); // Відмінити в родовому відмінку.
shevchenko.inDative(person); // Відмінити в давальному відмінку.
shevchenko.inAccusative(person); // Відмінити в знахідному відмінку.
shevchenko.inAblative(person); // Відмінити в орудному відмінку.
shevchenko.inLocative(person); // Відмінити в місцевому відмінку.
shevchenko.inVocative(person); // Відмінити в кличному відмінку.
shevchenko.inAll(person); // Відмінити в усіх відмінках.
```
