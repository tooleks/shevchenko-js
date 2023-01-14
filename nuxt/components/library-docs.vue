<template>
  <section id="documentation" class="my-4">
    <div class="row">
      <div class="col">
        <h2>{{ $t('documentation') }}</h2>
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

    <div class="row">
      <div class="col">
        <ApiSpec />
      </div>
    </div>
  </section>
</template>
