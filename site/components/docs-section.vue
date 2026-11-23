<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAbsoluteUrl } from '~/composables/absolute-url';
import type { CodeTab } from '~/components/code-tabs.vue';
import type { DocsStep } from '~/components/docs-steps.vue';
import type { Resource } from '~/components/resource-cards.vue';

const appConfig = useAppConfig();
const { t: $t } = useI18n();
const { getAbsoluteUrl } = useAbsoluteUrl();

const apiSpecUrl = computed(() => getAbsoluteUrl(appConfig.library.apiSpecPath));

const npmInstallCommand = `npm install ${appConfig.library.name}`;

const importTabs = computed<CodeTab[]>(() => [
  {
    id: 'import-commonjs',
    label: 'CommonJS',
    description: $t('home.docs.import.commonJs'),
    code: `const shevchenko = require('${appConfig.library.name}');`,
  },
  {
    id: 'import-es-modules',
    label: 'ES Modules',
    description: $t('home.docs.import.esModules'),
    code: `import * as shevchenko from '${appConfig.library.name}';`,
  },
  {
    id: 'import-browser',
    label: $t('browser'),
    description: $t('home.docs.import.browser', { var: appConfig.library.name }),
    code: `\x3Cscript type="text/javascript" src="${appConfig.library.cdnUrl}">\x3C/script>`,
  },
]);

const declensionExample = `
const shevchenko = require('${appConfig.library.name}');

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
`;

const genderDetectionExample = `
const shevchenko = require('${appConfig.library.name}');

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
`;

const exampleTabs = computed<CodeTab[]>(() => [
  {
    id: 'declension-example',
    label: $t('home.docs.declensionExample'),
    description: $t('home.docs.declensionExample.description'),
    code: declensionExample.trim(),
  },
  {
    id: 'gender-detection-example',
    label: $t('home.docs.genderDetectionExample'),
    description: $t('home.docs.genderDetectionExample.description'),
    code: genderDetectionExample.trim(),
  },
]);

const steps = computed<DocsStep[]>(() => [
  {
    id: 'installation',
    title: $t('documentation.installation'),
    description: $t('home.docs.installation.description'),
    code: npmInstallCommand,
  },
  { id: 'import', title: $t('home.docs.import'), tabs: importTabs.value },
  { id: 'usage-example', title: $t('documentation.usageExample'), tabs: exampleTabs.value },
]);

const resources = computed<Resource[]>(() => [
  {
    id: 'apiSpec',
    icon: 'fa-solid fa-book-open',
    title: $t('documentation.apiSpec'),
    text: $t('home.resources.apiSpec.text'),
    to: apiSpecUrl.value,
    isExternal: true,
  },
  {
    id: 'sourceCode',
    icon: 'fa-brands fa-github',
    title: $t('home.resources.sourceCode.title'),
    text: $t('home.resources.sourceCode.text'),
    to: appConfig.library.gitHubUrl,
    isExternal: true,
  },
  {
    id: 'httpApi',
    icon: 'fa-brands fa-docker',
    title: $t('home.resources.httpApi.title'),
    text: $t('home.resources.httpApi.text'),
    to: appConfig.library.dockerHubUrl,
    isExternal: true,
  },
  {
    id: 'military',
    icon: 'fa-solid fa-shield-halved',
    title: $t('home.resources.military.title'),
    text: $t('home.resources.military.text'),
    to: { name: 'military' },
    isExternal: false,
    badge: $t('beta'),
  },
]);
</script>

<template>
  <section id="documentation" class="site-section site-section-muted">
    <div class="container">
      <SectionHeading :title="$t('documentation')" :subtitle="$t('home.docs.subtitle')" />
      <DocsSteps :steps="steps" />
      <ResourceCards :resources="resources" />
    </div>
  </section>
</template>
