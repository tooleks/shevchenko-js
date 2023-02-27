import library from './node_modules/shevchenko/package.json';

const BASE_URL = 'https://shevchenko-js.tooleks.com'; // 'https://tooleks.github.io/shevchenko-js'

export default {
  website: {
    url: BASE_URL,
    email: 'tooleks@gmail.com',
  },
  library: {
    name: library.name,
    version: library.version,
    releaseYear: 2017,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    wikiUrl: 'https://github.com/tooleks/shevchenko-js/wiki',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
    runKitUrl: 'https://runkit.com/tooleks/shevchenko',
    cdnUrl: 'https://unpkg.com/shevchenko',
  },
  content: {
    gitHubUrl: 'https://api.github.com/repos/tooleks/shevchenko-js',
    howItWorksUrl: 'https://raw.githubusercontent.com/wiki/tooleks/shevchenko-js/Принцип-роботи.md',
  },
};
