# shevchenko.js HTTP API

The official HTTP API of [shevchenko.js](https://shevchenko-js.tooleks.com) library.

## Installation

To pull the Docker image, use the following command:

```shell
docker pull tooleks/shevchenko
```

To start the Docker container, use the following command:

```shell
docker run --name shevchenko -p 3000:3000 -d tooleks/shevchenko
```

To verify the installation, run the following command:

```shell
wget -qO- http://localhost:3000/ 2>&1
```

The example output:

```JSON
{"name":"shevchenko","version":"3.0.8"}
```

## Public Endpoints

```
http://localhost:3000/nominative
http://localhost:3000/genitive
http://localhost:3000/dative
http://localhost:3000/accusative
http://localhost:3000/ablative
http://localhost:3000/locative
http://localhost:3000/vocative
```

## Usage Example

### Personal names declension

This example shows how to use the API to decline Ukrainian anthroponyms.

#### HTTP Request

```HTTP
POST http://localhost:3000/vocative
Content-Type: application/json

{
    "gender": "masculine",
    "givenName": "Тарас",
    "patronymicName": "Григорович",
    "familyName": "Шевченко"
}
```

#### HTTP Response

```HTTP
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "givenName": "Тарасе",
  "patronymicName": "Григоровичу",
  "familyName": "Шевченку"
}
```

### Automatic grammatical gender detection

This example shows how to use the API to automatically detect the grammatical gender of a Ukrainian anthroponym.

#### HTTP Request

```HTTP
POST http://localhost:3000/vocative
Content-Type: application/json

{
    "givenName": "Лариса",
    "patronymicName": "Петрівна",
    "familyName": "Косач-Квітка"
}
```

#### HTTP Response

```HTTP
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "givenName": "Ларисо",
  "patronymicName": "Петрівно",
  "familyName": "Косач-Квітко"
}
```
