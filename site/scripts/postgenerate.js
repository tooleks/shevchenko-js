const { copyFileSync } = require('fs');
const { join: joinPath } = require('path');

// Create /en-US -> /en.html route alias.
copyFileSync(
  joinPath(__dirname, '../.output/public/en-US/index.html'),
  joinPath(__dirname, '../.output/public/en.html')
);
