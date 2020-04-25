'use strict';

require('dotenv').config();

const util = require('util');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const i18n = require('i18n');
const ServiceFactory = require('./services/ServiceFactory');

const writeFileAsync = util.promisify(fs.writeFile);

const serviceFactory = new ServiceFactory({
  baseUrl: process.env.APP_URL,
  languages: [
    { locale: 'uk', outFile: path.join(__dirname, '../docs/index.html') },
    { locale: 'en', outFile: path.join(__dirname, '../docs/en.html') },
  ],
});

i18n.configure({
  locales: serviceFactory.parameters.languages.map((language) => language.locale),
  directory: path.join(__dirname, 'locales'),
  syncFiles: true,
});

(async () => {
  for (const language of serviceFactory.parameters.languages) {
    const template = path.join(__dirname, 'templates/main.ejs');
    const html = await ejs.renderFile(template, serviceFactory.makeTemplateParameters(language));
    await writeFileAsync(language.outFile, html);
  }
})();
