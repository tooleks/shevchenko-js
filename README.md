## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

Бібліотека побудована на базі правил відмінювання із [репозиторія](https://github.com/tooleks/shevchenko-rules) та нейромереж.

### Демо

[http://shevchenko-js.tooleks.com/#demo](http://shevchenko-js.tooleks.com/#demo)

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

#### Доступні методи

- `shevchenko.inNominative(person)` - відмінити в називному відмінку;
- `shevchenko.inGenitive(person)`- відмінити в родовому відмінку;
- `shevchenko.inDative(person)`- відмінити в давальному відмінку;
- `shevchenko.inAccusative(person)`- відмінити в знахідному відмінку;
- `shevchenko.inAblative(person)`- відмінити в орудному відмінку;
- `shevchenko.inLocative(person)`- відмінити в місцевому відмінку;
- `shevchenko.inVocative(person)`- відмінити в кличному відмінку.

### Встановлення

Запустіть наступну команду для встановлення бібліотеки.

```bash
npm install --save shevchenko
```

### Підключення

#### Node.js

```JavaScript
var shevchenko = require("shevchenko");
```

#### Браузер

```HTML
<script type="text/javascript" src="/path/to/shevchenko/dist/bundle/shevchenko.min.js"></script>
```

### Використання в інших мовах програмування

* Встановіть бібліотеку описаним вище способом на веб-сервері з найновішою стабільною версією [Node.js](https://nodejs.org).

* Запустіть мікросервіс, виконавши наступну команду.
 
```bash
PORT=8080 node ./node_modules/shevchenko/examples/shevchenko-microservice.js
```

Для виробничого середовища краще скористатися менеджером процесів, наприклад [PM2](http://pm2.keymetrics.io). 

* Надішліть `HTTP` `POST` запит за адресою `http://localhost:8080`, щоб провідміняти прізвище, ім'я та по батькові особи.

HTTP

```HTTP
POST  HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{"person":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}
```

cURL

```bash
curl -X POST \
  http://localhost:8080/ \
  -H 'content-type: application/json' \
  -d '{"person":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}'
```
