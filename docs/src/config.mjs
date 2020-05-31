import path from 'path';
import url from 'url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  app: {
    url: 'https://tooleks.github.io/shevchenko-js',
    email: 'tooleks@gmail.com',
    meta: {
      imageUrl: 'https://tooleks.github.io/shevchenko-js/static/img/shevchenko_pixelized_608x608.jpg',
      imageWidth: 608,
      imageHeight: 608,
    },
    localeDir: path.join(dir, '../locales'),
    templateFile: path.join(dir, '../templates/main.ejs'),
    bundleFile: path.join(dir, '../static/js/shevchenko.min.js'),
    languages: [
      { locale: 'uk', file: path.join(dir, '../index.html') },
      { locale: 'en', file: path.join(dir, '../en.html') },
    ],
  },
  library: {
    bundleFile: path.join(dir, '../../dist/umd/shevchenko.min.js'),
    name: 'shevchenko',
    releaseYear: 2017,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
  },
};
