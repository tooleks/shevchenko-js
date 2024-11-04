import { useI18n } from 'vue-i18n';
import { type MaybeRef } from 'vue';
import type { LocaleName } from '~/plugins/i18n';

export function useCurrentLocale(locale: MaybeRef<LocaleName>) {
  const i18n = useI18n();
  i18n.locale.value = unref(locale);

  useHead({
    htmlAttrs: {
      lang: unref(locale).toLowerCase().split('-')[0],
    },
  });
}
