<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const pageTitle = computed(() => $t('error.404.title'));

useHead({
  title: pageTitle,
});
</script>

<template>
  <NuxtLayout>
    <PageHeader />

    <div class="px-3 px-lg-4 py-4 my-3 bg-light rounded-3">
      <h1 class="text-truncate">
        {{ $t('error.404.title') }}
      </h1>

      <p>
        {{ $t('error.404.message') }}
      </p>

      <NuxtLink :to="{ name: 'index' }" class="btn btn-primary">
        {{ $t('action.backToHome') }}
      </NuxtLink>
    </div>

    <hr />
    <PageFooter />
    <AboutModal />
    <ContactUsModal />
  </NuxtLayout>
</template>
