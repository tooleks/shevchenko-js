<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { DocsStep } from '~/components/docs-steps.vue';
import type { Resource } from '~/components/resource-cards.vue';

const appConfig = useAppConfig();
const { t: $t } = useI18n();

const libraryName = appConfig.library.name;
const extensionName = appConfig.militaryExtension.name;

const npmInstallCommand = `npm install ${libraryName} ${extensionName}`;

const commonJsImport = `
const shevchenko = require('${libraryName}');
const { militaryExtension } = require('${extensionName}');

shevchenko.registerExtension(militaryExtension);
`;

const esModulesImport = `
import * as shevchenko from '${libraryName}';
import { militaryExtension } from '${extensionName}';

shevchenko.registerExtension(militaryExtension);
`;

const usageExample = `
const shevchenko = require('${libraryName}');
const { militaryExtension } = require('${extensionName}');

shevchenko.registerExtension(militaryExtension);

async function main() {
  const genitive = await shevchenko.inGenitive({
    gender: 'masculine',
    militaryAppointment: 'помічник гранатометника',
    militaryRank: 'солдат',
    familyName: 'Шевченко',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
  });

  console.log(genitive); // { militaryAppointment: "помічника гранатометника", militaryRank: "солдата", familyName: "Шевченка", givenName: "Тараса", patronymicName: "Григоровича" }
}

main().catch((error) => console.error(error));
`;

const steps = computed<DocsStep[]>(() => [
  {
    id: 'installation',
    title: $t('documentation.installation'),
    description: $t('military.docs.installation.description'),
    code: npmInstallCommand,
  },
  {
    id: 'import',
    title: $t('home.docs.import'),
    tabs: [
      {
        id: 'import-commonjs',
        label: 'CommonJS',
        description: $t('military.docs.import.description'),
        code: commonJsImport.trim(),
      },
      {
        id: 'import-es-modules',
        label: 'ES Modules',
        description: $t('military.docs.import.description'),
        code: esModulesImport.trim(),
      },
    ],
  },
  {
    id: 'usage-example',
    title: $t('documentation.usageExample'),
    description: $t('military.docs.usageExample.description'),
    code: usageExample.trim(),
  },
]);

const resources = computed<Resource[]>(() => [
  {
    id: 'sourceCode',
    icon: 'fa-brands fa-github',
    title: $t('military.resources.sourceCode.title'),
    text: $t('military.resources.sourceCode.text'),
    to: appConfig.militaryExtension.gitHubUrl,
    isExternal: true,
  },
  {
    id: 'library',
    icon: 'fa-solid fa-signature',
    title: $t('military.resources.library.title'),
    text: $t('military.resources.library.text'),
    to: { name: 'index' },
    isExternal: false,
  },
]);
</script>

<template>
  <section id="documentation" class="site-section site-section-muted">
    <div class="container">
      <SectionHeading :title="$t('documentation')" :subtitle="$t('military.docs.subtitle')" />
      <DocsSteps :steps="steps" />
      <ResourceCards :resources="resources" />
    </div>
  </section>
</template>
