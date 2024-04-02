import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { dirname, files } from './constants.js';
import { downloadFile } from './utils.js';
import {
  copyNative,
  copyUsingBuffers,
  copyUsingPipe,
  copyUsingDataListener,
} from './functions.js';
import benchmark from 'benchmark';

const execAsync = promisify(exec);

main();

async function main(options = { download: false }) {
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

  const { download } = options;
  const filePath = download
    ? await downloadFile(files['10mb'])
    : 'tmp/10mb.pdf';

  await copyUsingBuffers(filePath);
  await copyUsingDataListener(filePath);
  await copyUsingPipe(filePath);
  await copyNative(filePath);

  const { stdout } = await execAsync(`du -h ${dirname}/*`);

  // should list all copied files with approximately same size
  console.log(stdout);

  comparePerf(filePath).run({ async: true });
}

function comparePerf(file) {
  const suite = new benchmark.Suite();

  suite
    .add('Native', () => copyNative(file))
    .add('Using stream pipes', () => copyUsingPipe(file))
    .add('Using stream data listener', () => copyUsingDataListener(file))
    .add('Using a buffer', () => copyUsingBuffers(file))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function () {
      // this part from:
      // https://medium.com/@aviad10m/node-js-benchmark-async-vs-sync-loops-a2736b77f5c7
      const format = (x) => `${(x * 1000).toFixed(5)} Ms`;
      const nativeInMs = format(this[0].stats.mean);
      const pipeInMs = format(this[1].stats.mean);
      const listenerInMs = format(this[2].stats.mean);
      const bufferInMs = format(this[3].stats.mean);

      console.log(`\nNative Avg: ${nativeInMs}`);
      console.log(`Pipe Avg: ${pipeInMs}`);
      console.log(`Listener Avg: ${listenerInMs}`);
      console.log(`Buffer Avg: ${bufferInMs}`);

      console.log(`\nFastest is ${this.filter('fastest').map('name')}`);
    });

  return suite;
}
