## JavaScript бібліотека "shevchenko" для відмінювання українських прізвищ, імен та по батькові

### Демо

[http://shevchenko-js.tooleks.com/#demo](http://shevchenko-js.tooleks.com/#demo)

### Опис роботи

Для відмінювання слів дана бібліотека використовує набір правил із [репозиторія](https://github.com/tooleks/shevchenko-rules), які перед використанням фільтруються та сортуються у порядку пріорітету.


Окрім того в українській мові є ряд іменників (із закінченнями на -а, -я), які виглядають як прикметники жіночого роду однини, наприклад, Диня (іменник), Синя (прикметник). Для обробки таких неоднозначних слів використовується [нейронна мережа прямого розповсюдження](https://en.wikipedia.org/wiki/Feedforward_neural_network), навчена на більш як 1600 власноруч відібраних зразках, яка спочатку визначає частину мови слова, а потім уже застосовує необхідне правило, наприклад, Диня - Дині - Дині, Синя - Синьої - Синій.

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

Щоб використовувати бібліотеку в інших мовах програмування можна скористатися інтерфейсом `HTTP`. Для цього встановіть бібліотеку описаним вище способом на веб-сервері з [Node.js](https://nodejs.org). Створіть файл `./shevchenko-microservice.js` із вмістом.

```JavaScript
const http = require("http");
const shevchenko = require("shevchenko");

const port = process.env.port || 8000;

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");
    if (request.method === "POST") {
        const chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => {
            try {
                const body = JSON.parse(Buffer.concat(chunks));
                const result = shevchenko(body.person, body.caseName);
                response.end(JSON.stringify(result));
            } catch (error) {
                response.statusCode = 422;
                response.end(JSON.stringify(error.message));
            }
        });
    } else {
        response.statusCode = 405;
        response.end(JSON.stringify("Method Not Allowed"));
    }
});

server.listen(port, (error) => {
    if (error) return console.log("An error has occurred.", error);
    console.log(`Server is listening on ${port} port.`);
});
```

Запустити сервіс можна командою `node shevchenko-microservice.js` (для виробничого середовища краще скористатися менеджером процесів, наприклад [PM2](http://pm2.keymetrics.io)). Відтоді отримати доступ до бібліотеки можна буде надіславши `HTTP` `POST` запит за адресою `http://localhost:8000`.

```bash
curl --data '{"person":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}' http://localhost:8000
```
