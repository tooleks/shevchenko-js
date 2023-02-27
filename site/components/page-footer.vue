<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <hr />

  <div class="row mb-1">
    <div class="col-12">
      <ul class="list-unstyled mb-0" role="menubar">
        <li class="d-inline mr-2" role="presentation">
          <span class="text-muted">
            {{ $t('library.version', { version: appConfig.library.version }) }}
          </span>
        </li>

        <li class="d-inline mr-2" role="presentation">
          <a :href="appConfig.library.gitHubUrl" target="_blank" role="menuitem">GitHub</a>
        </li>

        <li class="d-inline mr-2" role="presentation">
          <a :href="appConfig.library.npmUrl" target="_blank" role="menuitem">NPM</a>
        </li>

        <li class="d-inline mr-2" role="presentation">
          <ContactMeButton role="menuitem">
            {{ $t('action.contactMe') }}
          </ContactMeButton>
        </li>
      </ul>
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-12">
      <PageCopyright />
    </div>
  </div>
</template>
