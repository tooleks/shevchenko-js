<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <section id="preview" class="jumbotron my-3">
    <h1 class="text-truncate">
      {{ appConfig.library.displayName }}
      <span class="d-none d-lg-inline">
        <small class="text-muted"><DeclensionPreview :aria-hidden="true" /></small>
      </span>
    </h1>

    <p>
      {{ $t('website.longTitle') }}
    </p>

    <p>
      <NuxtLink class="btn btn-lg btn-primary" :to="{ hash: '#demo' }" role="button">
        {{ $t('liveDemo') }}
      </NuxtLink>

      <NuxtLink
        class="btn btn-lg btn-link text-decoration-none"
        :to="{ hash: '#usage-example' }"
        role="button"
      >
        {{ $t('documentation.usageExample') }}
      </NuxtLink>
    </p>
  </section>
</template>
