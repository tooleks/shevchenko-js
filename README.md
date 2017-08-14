## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

Увага! Бібліотека знаходиться на етапі розробки.

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

- `shevchenko.inVocative(person)` - відмінити в називному відмінку;
- `shevchenko.inGenitive(person)`- відмінити в родовому відмінку;
- `shevchenko.inDative(person)`- відмінити в давальному відмінку;
- `shevchenko.inAccusative(person)`- відмінити в знахідному відмінку;
- `shevchenko.inAblative(person)`- відмінити в орудному відмінку;
- `shevchenko.inLocative(person)`- відмінити в місцевому відмінку;
- `shevchenko.inVocative(person)`- відмінити в кличному відмінку.

### Встановлення

Запустіть наступну команду для встановлення бібліотеки.

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

### Використання в інших мовах програмування

Щоб використовувати бібліотеку в інших мовах програмування можна скористатися мікросервісом. Для цього встановіть бібліотеку описаним вище способом на веб-сервері з Node.js. Створіть файл за прикладом `./examples/shevchenko-microservice.js`.

```JavaScript
const shevchenko = require("shevchenko");
const http = require("http");

const port = process.env.port || 8000;

const server = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
        response.setHeader("Content-Type", "application/json");
        try {
            const body = JSON.parse(Buffer.concat(chunks));
            const result = shevchenko(body.person, body.caseName);
            response.end(JSON.stringify(result));
        } catch (error) {
            response.statusCode = 422;
            response.end(JSON.stringify(error.message));
        }
    });
});

server.listen(port, (error) => {
    if (error) return console.log("An error was occurred.", error);
    console.log(`Server is listening on ${port} port.`)
});
```

Запустіть сервер командою `node shevchenko-microservice.js`.

Запустіть наступну команду для тестування роботи мікросервіса.

```
curl --data '{"person":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}' http://localhost:8000
```

### Для розробників

#### Встановлення

Запустіть наступну команду (в директорії `./`) для встановлення залежностей.

```
npm install
```

#### Доступні команди

- `npm run load:rules` - завантажити актуальний набір правил відмінювання з [репозиторія](https://github.com/tooleks/shevchenko-rules);
- `npm run build` - побудувати вихідні файли в директорію `./dist/`;
- `npm run test` - запустити тести.
