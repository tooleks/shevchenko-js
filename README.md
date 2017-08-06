## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

Увага! Бібліотека знаходиться на етапі розробки.

### Встановлення

Запустіть наступну команду (в директорії `./`) для встановлення бібліотеки.

```
npm install --save shevchenko
```

### Підключення

#### Node.js

```JavaScript
var shevchenko = require("shevchenko");
```

#### Браузер

```HTML
<script type="text/javascript" src="/path/to/shevchenko/dist/shevchenko.min.js"></script>
```

### Використання

```JavaScript
var person = {
    gender: "male", // or "female"
    lastName: "шевченко",
    firstName: "тарас",
    middleName: "григорович"
};

var result = shevchenko.inVocative(person);

console.log(result); // {lastName: 'шевченку', firstName: 'тарасе', middleName: 'григоровичу'}
```

#### Доступні методи

- `shevchenko.inVocative(person)` - відмінити в називному відмінку;
- `shevchenko.inGenitive(person)`- відмінити в родовому відмінку;
- `shevchenko.inDative(person)`- відмінити в давальному відмінку;
- `shevchenko.inAccusative(person)`- відмінити в знахідному відмінку;
- `shevchenko.inAblative(person)`- відмінити в орудному відмінку;
- `shevchenko.inLocative(person)`- відмінити в місцевому відмінку;
- `shevchenko.inVocative(person)`- відмінити в кличному відмінку.

### Для розробників

#### Встановлення

Запустіть наступну команду (в директорії `./`) для встановлення залежностей.

```
npm install
```

#### Доступні команди

- `npm run load:rules` - завантажити актуальний набір правил відмінювання з [репозиторія](https://github.com/tooleks/shevchenko-rules);
- `npm run build` - побудувати вихідні файли в директорію `./dist`;
- `npm run test` - запустити тести.
