import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { LOCALES, type LocaleName } from '~/utils/locale';

function getOpenGraphLocale(locale: LocaleName): string {
  return locale.replace('-', '_');
}

export function useCurrentLocale() {
  const i18n = useI18n();
  const locale = computed(() => i18n.locale.value as LocaleName);

  useHead({
    htmlAttrs: {
      lang: computed(() => locale.value.toLowerCase().split('-')[0]),
    },
  });

  useSeoMeta({
    ogLocale: computed(() => getOpenGraphLocale(locale.value)),
    ogLocaleAlternate: computed(() =>
      LOCALES.filter((alternate) => alternate !== locale.value).map(getOpenGraphLocale),
    ),
  });

  return locale;
}
