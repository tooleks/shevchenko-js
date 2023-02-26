<script setup lang="ts">
const appConfig = useAppConfig();

const npmInstallCommand = `npm install --save ${appConfig.library.name}`;
const nodeRequireCode = `const ${appConfig.library.name} = require("${appConfig.library.name}");`;
const browserScriptCode = `<‍script type="text/javascript" src="${appConfig.library.cdnUrl}"><‍/script>`;
</script>

<template>
  <div id="installation" class="card my-3">
    <div class="card-body">
      <h5 class="card-title mb-3">{{ $t('installation') }}</h5>

      <h6 class="card-subtitle mb-2 text-muted">npm</h6>
      <div class="d-flex align-items-center mb-3">
        <pre class="mb-0">{{ npmInstallCommand }}</pre>
        <CopyButton :source="npmInstallCommand" />
      </div>

      <h6 class="card-subtitle mb-2 text-muted">Node.js</h6>
      <div class="d-flex align-items-center mb-3">
        <pre class="mb-0">{{ nodeRequireCode }}</pre>
        <CopyButton :source="nodeRequireCode" />
      </div>

      <h6 class="card-subtitle mb-2 text-muted">{{ $t('browser') }}</h6>
      <div class="d-flex align-items-center mb-3">
        <pre class="mb-0">{{ browserScriptCode }}</pre>
        <CopyButton :source="browserScriptCode" />
      </div>
    </div>
  </div>
</template>
