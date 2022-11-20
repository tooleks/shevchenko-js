<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const appConfig = useAppConfig();
const { t: $t } = useI18n();

const pageTitle = computed(() => {
  return appConfig.library.name + ' - ' + $t('error404.pageTitle').toString();
});

useHead({
  title: pageTitle,
});
</script>

<template>
  <NuxtLayout name="default">
    <PageHeader />
    <Error404 />
    <PageFooter />
  </NuxtLayout>
</template>
