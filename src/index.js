import fs from 'fs';
import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { memMonitor } from './memory-utils.js';
import { dirname, files } from './constants.js';
import { downloadPath, rethrow } from './utils.js';

const logMemDiff = memMonitor();

main();

// todo:
// rm file download
// test with copying
async function main() {
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
  // await downloadFile(files['10mb'].name, files['10mb'].url);
  
  const memTimer = setInterval(logMemDiff, 1000);
  
  await downloadFile(files['50mb'].name, files['50mb'].url);

  clearInterval(memTimer);

}

// todo
async function copySlow(fromPath, toFilename) {
  // use
  // fs.readFile
  // fs.writeFile
}

// todo
async function copyFast(fromPath, toFilename) {
  // use streams
}

async function downloadFile(filename, url) {
  logMemDiff(); // little memory usage
  const res = await axios({
    url,
    method: 'get',
    responseType: 'arraybuffer',
  });

  logMemDiff(); // + axios response space
  const buffer = Buffer.from(res.data, 'binary');
  logMemDiff(); // + file size

  const { ext } = await fileTypeFromBuffer(buffer);

  fs.writeFile(downloadPath(filename, ext), buffer, rethrow);
}
