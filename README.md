# shevchenko.js

JavaScript library for declension of Ukrainian anthroponyms.

![NPM Version](https://img.shields.io/npm/v/shevchenko)
![NPM Downloads](https://img.shields.io/npm/dm/shevchenko?label=npm%20downloads)
![Docker Pulls](https://img.shields.io/docker/pulls/tooleks/shevchenko)

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

#### npm

To install the library using [npm](https://docs.npmjs.com) package manager, use the following command:

```bash
npm install --save shevchenko
```

### Import

The library comes in three formats: CommonJS module, ECMAScript module, and a minified UMD bundle. You can select the format that best suits your needs.

#### CommonJS

To import the library as a CommonJS module, use the following code:

```JavaScript
const shevchenko = require('shevchenko');
```

#### ECMAScript

To import the library as an ECMAScript module, use the following code:

```JavaScript
import * as shevchenko from 'shevchenko';
```

#### UMD

To import the library as a UMD bundle, include the following script tag in your HTML code:

```HTML
<‍script type="text/javascript" src="https://unpkg.com/shevchenko"><‍/script>
```

### Use Cases

#### Personal names declension

This example shows how to use the library to decline Ukrainian anthroponyms.

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

#### Automatic grammatical gender detection

This example shows how to use the library to automatically detect the grammatical gender of a Ukrainian anthroponym.

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

#### Usage via HTTP API

The library can be integrated into your project via HTTP API. Please refer to [shevchenko](https://hub.docker.com/r/tooleks/shevchenko) Docker image for the additional instructions.
