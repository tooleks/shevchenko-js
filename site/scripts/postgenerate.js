const fs = require('node:fs');
const path = require('node:path');

// Create /en-US -> /en.html route alias.
fs.copyFileSync(
  path.join(__dirname, '../.output/public/en-US/index.html'),
  path.join(__dirname, '../.output/public/en.html'),
);
