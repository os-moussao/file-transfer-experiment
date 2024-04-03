import fs from 'fs';
import { dirname, files } from './constants.js';
import { downloadFile } from './utils.js';
import { runBenchmarks } from './benchmark.js';
import { runBenchmarksMine } from './benchmark-mine.js';

main({ download: true });

async function main(options = { download: false }) {
  if (!fs.existsSync(dirname)) {
    options.download = true;
    fs.mkdirSync(dirname);
  }

  const { download } = options;
  const filePath = download
    ? await downloadFile(files['10mb'])
    : 'tmp/10mb.pdf';

  console.log('Benchmark js results:');
  await runBenchmarks(filePath);

  console.log('\nMy benchmark results:');
  await runBenchmarksMine(filePath);
}
