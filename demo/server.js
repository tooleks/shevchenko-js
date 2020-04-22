'use strict';

require('dotenv').config();

const app = require('./src/app');

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});
