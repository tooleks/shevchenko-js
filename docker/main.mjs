import * as fs from 'node:fs';
import * as path from 'node:path';
import express from 'express';
import * as shevchenko from 'shevchenko';

const meta = loadMeta();
const app = express();
const port = process.env.WEBAPI_PORT ?? 3000;

app.use(express.json());

function loadMeta() {
  const fileName = path.join(import.meta.dirname, 'node_modules/shevchenko/package.json');
  const fileContents = fs.readFileSync(fileName);
  const pkg = JSON.parse(fileContents, 'utf-8');
  return { name: pkg.name, version: pkg.version };
}

async function resolveGender(anthroponym) {
  if (anthroponym.gender) {
    return anthroponym.gender;
  }
  return shevchenko.detectGender(anthroponym);
}

app.get('/', (req, res, next) => {
  try {
    res.status(200).send(meta);
  } catch (err) {
    next(err);
  }
});

app.post('/nominative', async (req, res, next) => {
  try {
    const output = await shevchenko.inNominative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/genitive', async (req, res, next) => {
  try {
    const output = await shevchenko.inGenitive({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/dative', async (req, res, next) => {
  try {
    const output = await shevchenko.inDative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/accusative', async (req, res, next) => {
  try {
    const output = await shevchenko.inAccusative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/ablative', async (req, res, next) => {
  try {
    const output = await shevchenko.inAblative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/locative', async (req, res, next) => {
  try {
    const output = await shevchenko.inLocative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/vocative', async (req, res, next) => {
  try {
    const output = await shevchenko.inVocative({
      ...req.body,
      gender: await resolveGender(req.body),
    });
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

app.post('/gender', async (req, res, next) => {
  try {
    const gender = await shevchenko.detectGender(req.body);
    res.status(200).send({ gender });
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof shevchenko.InputValidationError) {
    res.status(422).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`shevchenko.js HTTP API is running on port ${port}.`);
});
