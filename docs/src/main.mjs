import fs from 'fs';
import ejs from 'ejs';
import config from './config.mjs';
import { buildUrl } from './url.mjs';
import { makeTranslator, getLanguages } from './lang.mjs';
import { getShareUrls } from './social.mjs';

const { writeFile, copyFile } = fs.promises;

async function main() {
  await copyBundleFile();
  await generateLanguageFiles();
}

async function copyBundleFile() {
  await copyFile(config.library.bundleFile, config.app.bundleFile);
  console.log(`Bundle file copied: ${config.library.bundleFile} -> ${config.app.bundleFile}.`);
}

async function generateLanguageFiles() {
  const tasks = config.app.languages.map((language) => generateLanguageFile(language));
  await Promise.all(tasks);
}

async function generateLanguageFile(language) {
  const __ = makeTranslator(language.locale);
  const url = buildUrl(language.file);
  const htmlContent = await ejs.renderFile(config.app.templateFile, {
    __: __,
    config: config,
    page: { locale: language.locale, url },
    languages: getLanguages(),
    share: getShareUrls(url, __('app.name')),
  });
  await writeFile(language.file, htmlContent);
  console.log(`Language file generated: ${language.locale} -> ${language.file}.`);
}

main()
  .then(() => {
    console.info('Generation completed.');
  })
  .catch((error) => {
    console.error(error);
  });
