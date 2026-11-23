import { useAbsoluteUrl } from '~/composables/absolute-url';
import { DEFAULT_LOCALE, LOCALES, type LocaleName } from '~/plugins/i18n';

export function useLocaleAlternates(path: string) {
  const { getAbsoluteUrl } = useAbsoluteUrl();

  function getLocaleUrl(locale: LocaleName): string {
    return getAbsoluteUrl(locale === DEFAULT_LOCALE ? path : `/${locale}${path}`);
  }

  useHead({
    link: [
      ...LOCALES.map((locale) => ({
        rel: 'alternate',
        hreflang: locale.split('-')[0],
        href: getLocaleUrl(locale),
      })),
      { rel: 'alternate', hreflang: 'x-default', href: getLocaleUrl(DEFAULT_LOCALE) },
    ],
  });

  return { getLocaleUrl };
}
