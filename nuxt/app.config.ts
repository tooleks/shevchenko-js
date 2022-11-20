// const baseUrl = 'https://tooleks.github.io/shevchenko-js';
const baseUrl = 'https://shevchenko-js.tooleks.com';

export default defineAppConfig({
  website: {
    url: baseUrl,
    email: 'tooleks@gmail.com',
    meta: {
      imageUrl: `${baseUrl}/shevchenko-js/static/img/shevchenko_pixelized_608x608.jpg`,
      imageWidth: 608,
      imageHeight: 608,
    },
  },
  library: {
    name: 'shevchenko',
    releaseYear: 2017,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    gitHubStatsUrl: 'https://api.github.com/repos/tooleks/shevchenko-js',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
    runKitUrl: 'https://runkit.com/tooleks/shevchenko',
    cdnUrl: 'https://unpkg.com/shevchenko',
  },
});
