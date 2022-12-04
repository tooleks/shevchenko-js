<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { buildPageUrl, useRouteUtils } from '~/composables/route-utils';
import { usePageMeta } from '~/composables/page-meta';
import { isDefinedAnthroponym } from '~/composables/declension';
import { Anthroponym } from 'shevchenko';

usePageI18n({
  locale: 'uk-UA',
});

const appConfig = useAppConfig();
const { t: $t } = useI18n();
const route = useRoute();
const { pageUrl } = useRouteUtils();
const router = useRouter();
const { buildPageTitle } = usePageMeta();

const defaultPageTitle = computed(() => {
  const title = $t('app.name').toString();
  return buildPageTitle(title);
});

const pageTitle = ref(defaultPageTitle.value);

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: buildPageUrl('/') },
  ],
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

async function updatePageTitle(anthroponym: Partial<Anthroponym>): Promise<void> {
  // if (!isDefinedAnthroponym(anthroponym)) {
  //   pageTitle.value = defaultPageTitle.value;
  //   return;
  // }

  // const title = $t('declension.anthroponym', { ...anthroponym })
  //   .toString()
  //   .replace(/  +/g, ' ');

  // pageTitle.value = buildPageTitle(title);

  // For some reason, the route query is not updated when all query keys remain the same.
  // The next line of code forcibly resets the route query to fix the bug.
  await router.replace({ query: {} });

  await router.replace({ query: { ...anthroponym } });
}

onMounted(() => updatePageTitle(route.query));
</script>

<template>
  <PageHeader />
  <PreviewBanner />
  <DeclensionDemo :initial-anthroponym="$route.query" @declension="updatePageTitle" />
  <HowItWorks />
  <LibraryDocs />
  <PageFooter />
  <ContactMeModal />
</template>
