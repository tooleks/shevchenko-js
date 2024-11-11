/**
 * Builds the absolute page URL for the given path.
 *
 * @deprecated Use `useAbsoluteUrl` composable instead.
 */
export function getAbsoluteUrl(fullPath: string, baseUrl: string = ''): string {
  return baseUrl + fullPath;
}

export function useAbsoluteUrl() {
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();

  /**
   * The absolute URL of the current page.
   */
  const absoluteUrl = computed(() => _getAbsoluteUrl(route.fullPath));

  function _getAbsoluteUrl(fullPath: string): string {
    return getAbsoluteUrl(fullPath, runtimeConfig.public.siteUrl);
  }

  return { getAbsoluteUrl: _getAbsoluteUrl, absoluteUrl };
}
