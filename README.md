# shevchenko

JavaScript library for declension of Ukrainian anthroponyms

## Links

* [Try it out](https://shevchenko-js.tooleks.com/en-US) / [Демонстрація](https://shevchenko-js.tooleks.com)
* [API Specification](https://shevchenko-js.tooleks.com/api-spec)
* [Source Code](https://github.com/tooleks/shevchenko-js)
* [License](https://github.com/tooleks/shevchenko-js/blob/main/LICENSE)
* [Migration Guide (v2 → v3)](../../wiki/Migration-Guide)

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

This example shows how to use the library to decline Ukrainian anthroponyms. The example code takes an input object that includes grammatical gender, given name, patronymic name, and family name of a person. Then, it passes the input object to the `shevchenko.inVocative()` method, which returns the declined version of the input anthroponym in vocative case. Finally, it logs the output object to the console.

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

This example shows how to use the library to automatically detect the grammatical gender of a Ukrainian anthroponym. The example code takes an input object that includes given name, patronymic name, and family name of a person. Then, it passes the input object to the `shevchenko.detectGender()` method, which returns the detected gender of the input anthroponym. If the method fails to detect the grammatical gender, it throws an error. Finally, it logs the declined version of the input object in vocative case to the console.

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

#### Usage via HTTP

The library can be integrated into your project via HTTP API. Please refer to [https://github.com/tooleks/shevchenko-http](https://github.com/tooleks/shevchenko-http) repository for more examples.
