import library from './node_modules/shevchenko/package.json';

const BASE_URL = 'https://shevchenko-js.tooleks.com'; // 'https://tooleks.github.io/shevchenko-js'

const currentYear = new Date().getFullYear();
const websiteName = new URL(BASE_URL).hostname;

export default {
  website: {
    url: BASE_URL,
    email: 'shevchenko-js@tooleks.com',
    copyright: `© 2017-${currentYear} ${websiteName}`,
  },
  library: {
    displayName: `${library.name}.js`,
    name: library.name,
    version: library.version,
    apiSpecificationUrl: `${BASE_URL}/api-spec`,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    dockerHubUrl: 'https://hub.docker.com/r/tooleks/shevchenko',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
    cdnUrl: 'https://unpkg.com/shevchenko',
  },
  content: {
    gitHubUrl: 'https://api.github.com/repos/tooleks/shevchenko-js',
    howItWorksUrl: 'https://raw.githubusercontent.com/wiki/tooleks/shevchenko-js/Принцип-роботи.md',
  },
};
