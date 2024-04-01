import fs from 'fs';
import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { memMonitor } from './memory-utils.js';
import { dirname, files } from './constants.js';
import { downloadPath, rethrow } from './utils.js';
if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

const logMemDiff = memMonitor();

downloadFile(files['10mb'].name, files['10mb'].url);

// const memTimer = setInterval(logMemDiff, 1000);
// downloadFile(files['500mb'].name, files['500mb'].url)
//   .then(() => clearInterval(memTimer))
//   .catch(console.error);

async function copySlow(from, toFilename) {
  // use
  // fs.readFile
  // fs.writeFile
}

async function copyFast(from, toFilename) {
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
