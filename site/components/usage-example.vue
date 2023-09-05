<script setup lang="ts">
const usageExample = `
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
`;
</script>

<template>
  <div id="usage-example" class="card my-3">
    <div class="card-body">
      <h5 class="card-title mb-3">
        {{ $t('documentation.usageExample') }}
      </h5>
      <pre class="mb-0">{{ usageExample.trim() }}</pre>
    </div>
  </div>
</template>
