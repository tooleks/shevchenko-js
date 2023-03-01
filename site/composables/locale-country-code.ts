import { countryCodeEmoji } from 'country-code-emoji';

export const useLocaleEmoji = () => {
  const getLocaleEmoji = (locale: string) => countryCodeEmoji(locale.split('-')[1]);
  return { getLocaleEmoji };
};
