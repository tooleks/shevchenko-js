'use strict';

const path = require('path');

module.exports = {
  app: {
    url: 'https://tooleks.github.io/shevchenko-js',
    email: 'tooleks@gmail.com',
    meta: {
      imageUrl: 'https://tooleks.github.io/shevchenko-js/static/img/shevchenko_pixelized_608x608.jpg',
      imageWidth: 608,
      imageHeight: 608,
    },
    templateFile: path.join(__dirname, 'templates/main.ejs'),
    bundleFile: path.join(__dirname, '../docs/static/js/shevchenko.min.js'),
    languages: {
      uk: path.join(__dirname, '../docs/index.html'),
      en: path.join(__dirname, '../docs/en.html'),
    },
  },
  library: {
    bundleFile: path.join(__dirname, '../dist/umd/shevchenko.min.js'),
    name: 'shevchenko',
    releaseYear: 2017,
    npmUrl: 'https://www.npmjs.com/package/shevchenko',
    gitHubUrl: 'https://github.com/tooleks/shevchenko-js',
    issuesUrl: 'https://github.com/tooleks/shevchenko-js/issues',
    licenseUrl: 'https://github.com/tooleks/shevchenko-js/blob/master/LICENSE',
  },
};
