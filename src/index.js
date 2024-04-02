import fs from 'fs';
import { dirname, files } from './constants.js';
import { downloadFile } from './utils.js';
import { runBenchmarks } from './benchmark.js';

main();

async function main(options = { download: false }) {
  if (!fs.existsSync(dirname)) {
    options.download = true;
    fs.mkdirSync(dirname);
  }

  const { download } = options;
  const filePath = download
    ? await downloadFile(files['10mb'])
    : 'tmp/10mb.pdf';

  await runBenchmarks(filePath);
}
