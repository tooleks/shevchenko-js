import * as shevchenko from './src/shevchenko';

async function run() {
  // @ts-ignore
  const result = await shevchenko.inGenitive({ gender: 'masculine', familyName: 'Дятел' });
  console.log(result);
}

run();