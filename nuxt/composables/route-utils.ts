export const useRouteUtils = () => {
  const appConfig = useAppConfig();
  const route = useRoute();

  /**
   * Builds an absolute page URL for the given path.
   */
  const buildPageUrl = (fullPath = '') => {
    const url = new URL(appConfig.website.url);
    url.pathname = fullPath;
    return url.toString();
  };

  /**
   * The absolute URL of the current page.
   */
  const pageUrl = computed(() => buildPageUrl(route.fullPath));

  return { buildPageUrl, pageUrl };
};
