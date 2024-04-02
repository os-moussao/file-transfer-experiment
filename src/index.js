import fs from 'fs';
import https from 'https';
import { memMonitor } from './memory-utils.js';
import { dirname, files } from './constants.js';
import { downloadFile, rethrow } from './utils.js';

main();

// todo:
// test with copying
async function main() {
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

  const filePath = await downloadFile(files['200mb']);

  console.log(`downloaded ${filePath}`);
}

// todo
async function copy(fromPath, toFilename) {}

// todo
async function copy2(fromPath, toFilename) {
  // use streams
}

// todo
async function copy3() {}
