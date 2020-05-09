'use strict';

const util = require('util');
const fs = require('fs');
const ejs = require('ejs');
const config = require('./config');
const url = require('./url');
const lang = require('./lang');
const share = require('./share');

const writeFileAsync = util.promisify(fs.writeFile);
const copyFileAsync = util.promisify(fs.copyFile);

(async () => {
  await copyFileAsync(config.library.bundleFile, config.app.bundleFile);
  for (const [locale, pageFile] of Object.entries(config.app.languages)) {
    const translate = lang.make(locale);
    const pageUrl = url.build(pageFile);
    const templateParams = {
      __: translate,
      config: config,
      page: { language: locale, url: pageUrl },
      languages: lang.all(),
      share: share.all(pageUrl, translate('appDescription')),
    };
    await writeFileAsync(pageFile, await ejs.renderFile(config.app.templateFile, templateParams));
  }
})();
