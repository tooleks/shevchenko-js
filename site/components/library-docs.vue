<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <section id="documentation" class="my-4">
    <div class="row">
      <div class="col">
        <h2>
          {{ $t('documentation') }}
          <small class="d-block h6 mt-2 mb-0 text-decoration-none">
            <a :href="appConfig.library.apiSpecificationUrl" target="_blank">
              {{ $t('action.navigateToFullVersion') }}
            </a>
          </small>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <InstallationInstructions />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <UsageExample />
      </div>
    </div>
  </section>
</template>
