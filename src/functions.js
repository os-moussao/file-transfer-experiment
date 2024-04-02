import fs, { read } from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

// functions to benchmark

export async function copyUsingBuffers(filePath) {
  const newFilePath = getNewFilePath(filePath, 'copy1');

  const content = await fsPromises.readFile(filePath);
  await fsPromises.writeFile(newFilePath, content);

  return newFilePath;
}

export async function copyUsingDataListener(filePath) {
  return new Promise((resolve) => {
    const newFilePath = getNewFilePath(filePath, 'copy2');

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.on('data', (chunk) => {
      writeStream.write(chunk);
    });

    readStream.on('end', () => {
      readStream.close();
      writeStream.close();

      resolve(newFilePath);
    });
  });
}

export function copyUsingPipe(filePath) {
  return new Promise((resolve) => {
    const newFilePath = getNewFilePath(filePath, 'copy3');

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.pipe(writeStream);

    readStream.on('end', () => {
      readStream.close();
      writeStream.close();

      resolve(newFilePath);
    });
  });
}

export async function copyNative(filePath) {
  const newFilePath = getNewFilePath(filePath, 'copy4');
  await fsPromises.copyFile(filePath, newFilePath);

  return newFilePath;
}

function getNewFilePath(filePath, prefix) {
  const { dir, base } = path.parse(filePath);

  return dir + `/${prefix}-` + base;
}
