const { copyFileSync } = require('fs');
const { join } = require('path');

const dir = join(__dirname, '../.output/public');
const src = join(dir, 'en-US/index.html');
const dest = join(dir, 'en.html');
copyFileSync(src, dest);
