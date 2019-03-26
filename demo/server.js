'use strict';

require('./env');
const app = require('./app');

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});
