export const usePageMeta = () => {
  const appConfig = useAppConfig();
  const buildPageTitle = (title: string) => appConfig.library.name + ' - ' + title;
  return { buildPageTitle };
};
