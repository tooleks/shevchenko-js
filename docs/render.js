'use strict';

require('dotenv').config();

const util = require('util');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const i18n = require('i18n');
const ShareLinksProvider = require('./services/ShareLinksProvider');
const UrlBuilder = require('./services/UrlBuilder');

const writeFileAsync = util.promisify(fs.writeFile);

const languages = [
  { locale: 'uk', outFile: path.join(__dirname, 'public/index.html') },
  { locale: 'en', outFile: path.join(__dirname, 'public/en.html') },
];

i18n.configure({
  locales: languages.map((language) => language.locale),
  directory: path.join(__dirname, 'locales'),
  syncFiles: true,
});

const template = path.join(__dirname, 'templates/main.ejs');

(async () => {

  for (const language of languages) {

    const urlBuilder = new UrlBuilder(process.env.APP_URL);
    const shareLinksProvider = new ShareLinksProvider();

    const translate = (phrase) => {
      i18n.setLocale(language.locale);
      return i18n.__(phrase);
    };

    const html = await ejs.renderFile(template, {
      __: translate,
      env: process.env,
      currentUrl: urlBuilder.buildUrl(language.outFile),
      facebookShareUrl: shareLinksProvider.facebook(urlBuilder.buildUrl(language.outFile)),
      twitterShareUrl: shareLinksProvider.twitter(urlBuilder.buildUrl(language.outFile)),
      linkedInShareUrl: shareLinksProvider.linkedIn(urlBuilder.buildUrl(language.outFile), translate('appDescription')),
      languages: languages.map((language) => {
        const url = urlBuilder.buildUrl(language.outFile)
        const name = translate({ phrase: `${language.locale}Language`, locale: language.locale });
        return { url, name };
      }),
    });

    await writeFileAsync(language.outFile, html);

  }

})();
