## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

![Приклад відмінювання](https://raw.githubusercontent.com/tooleks/shevchenko-js/master/demo/img/inflection_examples.png)

* [Демо](http://shevchenko-js.tooleks.com/#demo)
* [Документація](https://github.com/tooleks/shevchenko-js/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F)
* [Принцип роботи](https://github.com/tooleks/shevchenko-js/wiki/%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8)

### Встановлення

```bash
npm install --save shevchenko
```

### Використання

```JavaScript
var person = {
    gender: "male", // or "female"
    lastName: "Шевченко",
    firstName: "Тарас",
    middleName: "Григорович"
};

var result = shevchenko.inVocative(person);

console.log(result); // {lastName: 'Шевченку', firstName: 'Тарасе', middleName: 'Григоровичу'}
```
