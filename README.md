## JavaScript бібліотека "shevchenko" для відмінювання український прізвищ, імен та по батькові

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
    gender: "male", // Or "female".
    lastName: "петренко",
    firstName: "петро",
    middleName: "петрович"
};

var result = shevchenko(person, shevchenko.caseNameVocative);

console.log(result);

// {
//     lastName: 'петренку',
//     firstName: 'петре',
//     middleName: 'петровичу'
// }
```

#### Доступні опції

##### Роди

- `shevchenko.genderMale` - чоловічий рід;
- `shevchenko.genderFemale` - жіночий рід.

##### Відмінки

- `shevchenko.caseNameNominative` - називний відмінок;
- `shevchenko.caseNameGenitive` - родовий відмінок;
- `shevchenko.caseNameDative` - давальний відмінок;
- `shevchenko.caseNameAccusative` - знахідний відмінок;
- `shevchenko.caseNameAblative` - орудний відмінок;
- `shevchenko.caseNameLocative` - місцевий відмінок;
- `shevchenko.caseNameVocative` - кличний відмінок.

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
