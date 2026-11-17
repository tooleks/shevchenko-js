# shevchenko.js

JavaScript library for declension of Ukrainian anthroponyms.

[![NPM Version](https://img.shields.io/npm/v/shevchenko?label=release)](https://github.com/tooleks/shevchenko-js/releases)
[![NPM Downloads](https://img.shields.io/npm/dm/shevchenko?label=npm%20downloads)](https://www.npmjs.com/package/shevchenko)
[![Docker Pulls](https://img.shields.io/docker/pulls/tooleks/shevchenko)](https://hub.docker.com/r/tooleks/shevchenko)

## Links

* [Try it out](https://shevchenko-js.tooleks.com/en-US) / [Демонстрація](https://shevchenko-js.tooleks.com)
* [API Specification](https://shevchenko-js.tooleks.com/api-spec)
* [Source Code](https://github.com/tooleks/shevchenko-js)
* [License](https://github.com/tooleks/shevchenko-js/blob/main/LICENSE)
* [Migration Guide (v2 → v3)](https://github.com/tooleks/shevchenko-js/wiki/Migration-Guide)

## Extensions

* [Military extension](https://github.com/tooleks/shevchenko-ext-military) - declension of Ukrainian military ranks and appointments

## User Guide

### Installation

Install the library with [npm](https://docs.npmjs.com):

```bash
npm install shevchenko
```

### Import

The library is available as a CommonJS module, an ECMAScript module, and a minified UMD bundle.

#### CommonJS

```JavaScript
const shevchenko = require('shevchenko');
```

#### ECMAScript module

```JavaScript
import * as shevchenko from 'shevchenko';
```

#### UMD

Load the bundle with a script tag. It exposes the library as the global `shevchenko` variable.

```HTML
<script type="text/javascript" src="https://unpkg.com/shevchenko"></script>
```

### Use Cases

#### Declining names

This example declines a full name in the vocative case.

```JavaScript
const shevchenko = require('shevchenko');

async function main() {
  const input = {
    gender: 'masculine',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
    familyName: 'Шевченко'
  };

  const output = await shevchenko.inVocative(input);

  console.log(output); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
}

main().catch((error) => console.error(error));
```

#### Detecting grammatical gender

This example detects the grammatical gender of a name before declining it.

```JavaScript
const shevchenko = require('shevchenko');

async function main() {
  const anthroponym = {
    givenName: 'Лариса',
    patronymicName: 'Петрівна',
    familyName: 'Косач-Квітка'
  };

  const gender = await shevchenko.detectGender(anthroponym); // "feminine"
  if (gender == null) {
    throw new Error('Failed to detect grammatical gender.');
  }

  const input = { ...anthroponym, gender };

  const output = await shevchenko.inVocative(input);

  console.log(output); // { givenName: "Ларисо", patronymicName: "Петрівно", familyName: "Косач-Квітко" }
}

main().catch((error) => console.error(error));
```

#### Using the HTTP API

The library is also available as an HTTP API. See the [shevchenko](https://hub.docker.com/r/tooleks/shevchenko) Docker image for setup instructions.
