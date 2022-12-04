<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { useRouteUtils } from '~/composables/route-utils';
import { buildPageUrl } from '../composables/route-utils';

usePageI18n({
  locale: 'uk-UA',
});

const appConfig = useAppConfig();
const { t: $t } = useI18n();
const { pageUrl } = useRouteUtils();

const pageTitle = computed(() => appConfig.library.name + ' - ' + $t('app.name').toString());

useHead({
  title: pageTitle,
  meta: [
    { property: 'og:image', content: buildPageUrl('/preview-608x608.jpg') },
    { property: 'og:image:width', content: '608' },
    { property: 'og:image:height', content: '608' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:site_name', content: appConfig.library.name },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageTitle },
    { name: 'twitter:image', content: buildPageUrl('/preview-608x608.jpg') },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
  ],
});
</script>

<template>
  <PageHeader />
  <PreviewBanner />
  <DeclensionDemo />
  <HowItWorks />
  <LibraryDocs />
  <PageFooter />
  <ContactMeModal />
</template>
