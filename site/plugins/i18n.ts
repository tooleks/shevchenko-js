import { createI18n } from 'vue-i18n';
import enUS from '~/locales/en-US.json';
import ukUA from '~/locales/uk-UA.json';

export type LocaleName = 'en-US' | 'uk-UA';
type MessageSchema = typeof enUS & typeof ukUA;
type MessageDictionary = any;

export const DEFAULT_LOCALE: LocaleName = 'uk-UA';
const FALLBACK_LOCALE: LocaleName = 'en-US';

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n<MessageSchema, LocaleName>({
    legacy: false,
    globalInjection: true,
    messageResolver: (dict: MessageDictionary, path: string) => {
      const message = dict[path];
      return message != null ? message : null;
    },
    locale: DEFAULT_LOCALE,
    fallbackLocale: FALLBACK_LOCALE,
    messages: {
      'en-US': enUS,
      'uk-UA': ukUA,
    },
  });

  vueApp.use(i18n);

  // Overrides to auto-include the locale prefix.

  const router = useRouter();
  const originalResolve = router.resolve.bind(router);

  // @ts-ignore
  router.resolve = function (to, current, append) {
    // @ts-ignore
    const resolved = originalResolve(to, current, append);
    resolved.href = getI18nPath(i18n.global.locale.value, resolved.href);
    return resolved;
  };

  router.beforeEach((to, from, next) => {
    if (from == null) {
      next();
      return;
    }

    const fullPath = getI18nPath(i18n.global.locale.value, to.fullPath);
    if (fullPath !== to.fullPath) {
      next(fullPath);
      return;
    }

    next();
  });
});

/**
 * Returns the full path with a locale prefix.
 */
function getI18nPath(locale: LocaleName, fullPath: string): string {
  if (locale === DEFAULT_LOCALE) {
    return fullPath;
  }

  const localePrefix = `/${locale}`;
  if (fullPath.startsWith(localePrefix)) {
    return fullPath;
  }

  return `${localePrefix}${fullPath}`;
}
