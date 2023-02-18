<script setup lang="ts">
const appConfig = useAppConfig();

const usageExample = `
const input = {
  gender: 'masculine', // Grammatical gender: 'masculine' or 'feminine'
  givenName: 'Тарас',
  patronymicName: 'Григорович',
  familyName: 'Шевченко'
};

const output = await shevchenko.inVocative(input);

console.log(output); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
`;
</script>

<template>
  <div id="usage-example" class="card my-3">
    <div class="card-body">
      <h5 class="card-title mb-3">
        {{ $t('usageExample') }}
        <small
          ><a :href="appConfig.library.runKitUrl" target="_blank">
            {{ $t('action.tryItOut') }}
          </a></small
        >
      </h5>
      <pre class="mb-0">{{ usageExample.trim() }}</pre>
    </div>
  </div>
</template>
