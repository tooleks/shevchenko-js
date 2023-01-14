const { cpSync, rmSync } = require('fs');
const { join } = require('path');

const src = join(__dirname, '../.output/public');
const dest = join(__dirname, '../../docs');
rmSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
