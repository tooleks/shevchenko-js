<script setup lang="ts">
import { useAbsoluteUrl } from '~/composables/absolute-url';

const appConfig = useAppConfig();
const { getAbsoluteUrl } = useAbsoluteUrl();

const npmInstallCommand = `npm install --save ${appConfig.library.name}`;
const nodeRequireCode = `const shevchenko = require("${appConfig.library.name}");`;
const browserScriptCode = `<‍script type="text/javascript" src="${appConfig.library.cdnUrl}"><‍/script>`;
const usageExample = `
const shevchenko = require('${appConfig.library.name}');

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
  <section id="documentation" class="my-4">
    <div class="row">
      <div class="col">
        <h2>
          {{ $t('documentation') }}
          <small class="d-block h6 mt-2 mb-0 text-decoration-none">
            <a :href="getAbsoluteUrl(appConfig.library.apiSpecPath)" target="_blank">
              {{ $t('documentation.navigateToFullVersion') }}
            </a>
          </small>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <DocsInstallationCard>
          <h4 class="card-subtitle h6 mb-2 text-muted">npm</h4>
          <div class="d-flex align-items-center mb-3">
            <CodeLine :code="npmInstallCommand" />
          </div>

          <h4 class="card-subtitle h6 mb-2 text-muted">Node.js</h4>
          <div class="d-flex align-items-center mb-3">
            <CodeLine :code="nodeRequireCode" />
          </div>

          <h4 class="card-subtitle h6 mb-2 text-muted">{{ $t('browser') }}</h4>
          <div class="d-flex align-items-center mb-0">
            <CodeLine :code="browserScriptCode" />
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
