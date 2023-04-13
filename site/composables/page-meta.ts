export const usePageMeta = () => {
  const appConfig = useAppConfig();
  const buildPageTitle = (title: string) => appConfig.library.displayName + ' - ' + title;
  return { buildPageTitle };
};
