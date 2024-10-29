import pkg from './node_modules/shevchenko/package.json';

const BASE_URL = process.env.WEBSITE_URL ?? 'http://localhost:3000';

const currentYear = new Date().getFullYear();
const websiteName = new URL(BASE_URL).hostname;

export default {
  website: {
    url: BASE_URL,
    email: process.env.WEBSITE_EMAIL,
    copyright: `© 2017-${currentYear} ${websiteName}`,
  },
  library: {
    displayName: `${pkg.name}.js`,
    name: pkg.name,
    version: pkg.version,
    apiSpecificationUrl: `${BASE_URL}/api-spec`,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    dockerHubUrl: 'https://hub.docker.com/r/tooleks/shevchenko',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
    cdnUrl: 'https://unpkg.com/shevchenko',
  },
  militaryExtension: {
    name: 'shevchenko-ext-military',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-ext-military',
  },
  content: {
    gitHubUrl: 'https://api.github.com/repos/tooleks/shevchenko-js',
    howItWorksUrl: 'https://raw.githubusercontent.com/wiki/tooleks/shevchenko-js/Принцип-роботи.md',
  },
};
