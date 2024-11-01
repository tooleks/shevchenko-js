import config from '../config';

/**
 * Builds the absolute page URL for the given path.
 */
export function buildPageUrl(fullPath = ''): string {
  return config.website.url + fullPath;
}

export function useRouteUtils() {
  const route = useRoute();

  /**
   * The absolute URL of the current page.
   */
  const pageUrl = computed(() => buildPageUrl(route.fullPath));

  return { buildPageUrl, pageUrl };
}
