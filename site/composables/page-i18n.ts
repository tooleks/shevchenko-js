import { useI18n } from 'vue-i18n';
import type { LocaleName } from '~/plugins/i18n';

export interface PageI18nOptions {
  locale: LocaleName;
}

export const usePageI18n = (options: PageI18nOptions) => {
  const { locale } = useI18n();
  locale.value = options.locale;
};
