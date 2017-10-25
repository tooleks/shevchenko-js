## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

* [Демо](http://shevchenko-js.tooleks.com/#demo)
* [Документація](https://github.com/tooleks/shevchenko-js/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F)
* [Принцип роботи](https://github.com/tooleks/shevchenko-js/wiki/%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8)
* [Ліцензія](https://github.com/tooleks/shevchenko-js/blob/master/LICENSE)

### Встановлення

```bash
npm install --save shevchenko
```

### Використання

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
