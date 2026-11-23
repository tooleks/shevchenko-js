import { useI18n } from 'vue-i18n';
import { type MaybeRef } from 'vue';
import { LOCALES, type LocaleName } from '~/plugins/i18n';

function getOpenGraphLocale(locale: LocaleName): string {
  return locale.replace('-', '_');
}

export function useCurrentLocale(locale: MaybeRef<LocaleName>) {
  const i18n = useI18n();
  i18n.locale.value = unref(locale);

  useHead({
    htmlAttrs: {
      lang: unref(locale).toLowerCase().split('-')[0],
    },
  });

  useSeoMeta({
    ogLocale: getOpenGraphLocale(unref(locale)),
    ogLocaleAlternate: LOCALES.filter((alternate) => alternate !== unref(locale)).map(
      getOpenGraphLocale,
    ),
  });
}
