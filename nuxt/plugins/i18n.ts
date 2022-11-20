import { createI18n } from 'vue-i18n';
import enUS from '~/locales/en-US.json';
import ukUA from '~/locales/uk-UA.json';

export type LocaleName = 'en-US' | 'uk-UA';
type MessageSchema = typeof enUS;
type MessageDictionary = any;

export const defaultLocale: LocaleName = 'uk-UA';
export const fallbackLocale: LocaleName = 'en-US';

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n<MessageSchema, LocaleName>({
    legacy: false,
    globalInjection: true,
    messageResolver: (messages: MessageDictionary, path) => {
      const message = messages[path];
      return message != null ? message : null;
    },
    locale: defaultLocale,
    fallbackLocale: fallbackLocale,
    messages: { 'en-US': enUS, 'uk-UA': ukUA },
  });

  vueApp.use(i18n);
});
