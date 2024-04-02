import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { dirname, files } from './constants.js';
import { downloadFile } from './utils.js';
import {
  copyNative,
  copyUsingBuffers,
  copyUsingPipe,
  copyUsingStreamOnData,
} from './functions.js';

const execAsync = promisify(exec);

main({ download: true });

async function main(options = { download: false }) {
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

  const { download } = options;
  const filePath = download
    ? await downloadFile(files['10mb'])
    : 'tmp/10mb.pdf';

  await copyUsingBuffers(filePath);
  await copyUsingStreamOnData(filePath);
  await copyUsingPipe(filePath);
  await copyNative(filePath);

  const { stdout } = await execAsync(`du -h ${dirname}/*`);

  // should list all copied files with approximately same size
  console.log(stdout);

  // todo: benchmark
}
