# shevchenko.js

JavaScript library for the declension of Ukrainian personal names.

[![NPM Version](https://img.shields.io/npm/v/shevchenko?label=release)](https://github.com/tooleks/shevchenko-js/releases)
[![NPM Downloads](https://img.shields.io/npm/dm/shevchenko?label=npm%20downloads)](https://www.npmjs.com/package/shevchenko)
[![Docker Pulls](https://img.shields.io/docker/pulls/tooleks/shevchenko)](https://hub.docker.com/r/tooleks/shevchenko)

## Links

* [Try it out](https://shevchenko-js.tooleks.com/en-US/) / [Демонстрація](https://shevchenko-js.tooleks.com)
* [API specification](https://shevchenko-js.tooleks.com/api-spec/)
* [Source code](https://github.com/tooleks/shevchenko-js)
* [License](https://github.com/tooleks/shevchenko-js/blob/main/LICENSE)

## Extensions

* [Military extension](https://github.com/tooleks/shevchenko-ext-military) — declension of Ukrainian military ranks and appointments

## User guide

### Installation

Install the library with [npm](https://docs.npmjs.com):

```bash
npm install shevchenko
```

### Import

The library is available as a CommonJS module, an ECMAScript module and a minified UMD bundle.

#### CommonJS

```JavaScript
const shevchenko = require('shevchenko');
```

#### ECMAScript module

```JavaScript
import * as shevchenko from 'shevchenko';
```

#### UMD

Load the bundle with a `<script>` tag. It exposes the library as the global `shevchenko` variable.

```HTML
<script type="text/javascript" src="https://unpkg.com/shevchenko"></script>
```

### Use cases

#### Declining names

This example declines a full name in the vocative case.

```JavaScript
const shevchenko = require('shevchenko');

async function main() {
  const name = {
    givenName: 'Тарас',
    patronymicName: 'Григорович',
    familyName: 'Шевченко'
  };

  const vocative = await shevchenko.inVocative({ ...name, gender: 'masculine' });

  console.log(vocative); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
}

main().catch((error) => console.error(error));
```

#### Detecting grammatical gender

This example detects the grammatical gender of a name before declining it.

```JavaScript
const shevchenko = require('shevchenko');

async function main() {
  const name = {
    givenName: 'Лариса',
    patronymicName: 'Петрівна',
    familyName: 'Косач-Квітка'
  };

  const gender = await shevchenko.detectGender(name); // "feminine"
  if (gender == null) {
    throw new Error('Failed to detect grammatical gender.');
  }

  const vocative = await shevchenko.inVocative({ ...name, gender });

  console.log(vocative); // { givenName: "Ларисо", patronymicName: "Петрівно", familyName: "Косач-Квітко" }
}

main().catch((error) => console.error(error));
```

#### Using the HTTP API

The library is also available as an HTTP API. See the [tooleks/shevchenko](https://hub.docker.com/r/tooleks/shevchenko) Docker image for setup instructions.
