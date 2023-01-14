<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageMeta } from './composables/page-meta';

const { t: $t } = useI18n();
const { buildPageTitle } = usePageMeta();

const pageTitle = computed(() => {
  const title = $t('error404.pageTitle').toString();
  return buildPageTitle(title);
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
