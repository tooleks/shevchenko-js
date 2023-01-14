import config from '../config';

/**
 * Builds the absolute page URL for the given path.
 */
export const buildPageUrl = (fullPath = '') => config.website.url + fullPath;

export const useRouteUtils = () => {
  const route = useRoute();

  /**
   * The absolute URL of the current page.
   */
  const pageUrl = computed(() => buildPageUrl(route.fullPath));

  return { buildPageUrl, pageUrl };
};
