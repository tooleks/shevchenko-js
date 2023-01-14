<script setup lang="ts">
const appConfig = useAppConfig();

const usageExample = `
const anthroponym = {
  gender: 'male', // or 'female'
  firstName: 'Тарас',
  middleName: 'Григорович',
  lastName: 'Шевченко'
};

const result = shevchenko.inVocative(anthroponym);

console.log(result); // { gender: "male", firstName: "Тарасе", middleName: "Григоровичу", lastName: "Шевченку" }
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
