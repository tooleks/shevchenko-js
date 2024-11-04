<script setup lang="ts">
const appConfig = useAppConfig();

const npmInstallCommand = `npm install --save ${appConfig.library.name}@^3.1.0 ${appConfig.militaryExtension.name}`;
const usageExample = `
const shevchenko = require('${appConfig.library.name}');
const { militaryExtension } = require('${appConfig.militaryExtension.name}');

shevchenko.registerExtension(militaryExtension);

async function main() {
  const input = {
    gender: 'masculine',
    militaryRank: 'солдат',
    militaryAppointment: 'помічник гранатометника',
    familyName: 'Шевченко',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
  };

  const output = await shevchenko.inGenitive(input);

  console.log(output); // { militaryRank: "солдата", militaryAppointment: "помічника гранатометника", familyName: "Шевченка", givenName: "Тараса", patronymicName: "Григоровича" }
}

main().catch((error) => console.error(error));
`;
</script>

<template>
  <section id="documentation" class="my-4">
    <div class="row">
      <div class="col">
        <h2>
          {{ $t('documentation') }}
          <small class="d-block h6 mt-2 mb-0 text-decoration-none">
            <a :href="appConfig.militaryExtension.gitHubUrl" target="_blank">
              {{ $t('documentation.navigateToExtensionPage') }}
            </a>
          </small>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <DocsInstallationCard>
          <h4 class="card-subtitle h6 mb-2 text-muted">npm</h4>
          <div class="d-flex align-items-center mb-0">
            <CodeLine :code="npmInstallCommand" />
          </div>
        </DocsInstallationCard>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <DocsUsageExampleCard>
          <CodeBlock :code="usageExample.trim()" />
        </DocsUsageExampleCard>
      </div>
    </div>
  </section>
</template>
