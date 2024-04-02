import fs from 'fs';
import axios from 'axios';
import { dirname } from './constants.js';

export function downloadFile({ name, url }) {
  return new Promise(async (resolve, reject) => {
    const filePath = `${dirname}/${name}`;
    const writeStream = fs.createWriteStream(filePath);

    const res = await axios.get(url, {
      responseType: 'stream',
    });

    res.data.pipe(writeStream);

    writeStream.on('finish', () => {
      resolve(filePath);
    });
  });
}

export function rethrow(err) {
  if (err) throw err;
}
