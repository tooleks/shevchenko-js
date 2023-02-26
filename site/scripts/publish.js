const { cpSync, rmSync } = require('fs');
const { join: joinPath } = require('path');

// Publish build artifacts to the public site directory.
rmSync(joinPath(__dirname, '../../docs'), { recursive: true });
cpSync(joinPath(__dirname, '../.output/public'), joinPath(__dirname, '../../docs'), { recursive: true });
