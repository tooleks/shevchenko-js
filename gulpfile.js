'use strict';

const { writeFile } = require('fs/promises');
const axios = require('axios');
const gulp = require('gulp');

gulp.task('update:inflector-rules', async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json',
  );
  await writeFile('./src/resources/inflector/rules.json', JSON.stringify(response.data, null, 2));
});
