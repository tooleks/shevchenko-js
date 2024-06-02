import { useI18n } from 'vue-i18n';
import type { LocaleName } from '~/plugins/i18n';

export type PageI18nOptions = {
  locale: LocaleName;
};

export const usePageI18n = (options: PageI18nOptions) => {
  const { locale } = useI18n();
  locale.value = options.locale;

  useHead({
    htmlAttrs: {
      lang: options.locale.toLowerCase().split('-')[0],
    },
  });
};
