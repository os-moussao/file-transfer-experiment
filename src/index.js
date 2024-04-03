import fs from 'fs';
import { dirname, files } from './constants.js';
import { downloadFile } from './utils.js';
import { runBenchmarks } from './benchmark.js';
import { runBenchmarksMine } from './benchmark-mine.js';

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

  console.log('Benchmark js results:');
  await runBenchmarks(filePath);

  /**
   * running the benchmark.js tests gave results
   * where transferring chunk by chunk (using on 'data' listener) was always the fastest
   * not just that, it surpasses the native method with a huge amount
   * which I didn't expect (to even surpass the pipe method, since it looks more native to work with)
   *
   * I've been getting results around these numbers every time:
   *
   * Native Avg: 17.69574 Ms
   * Pipe Avg: 16.49812 Ms
   * Listener Avg: 9.05009 Ms   <--- fastest  ?wtf?
   * Buffer Avg: 20.94626 Ms
   *
   *
   * So I decided to do my own benchmarking to check...
   *
   * 
   * guess what:
   * 
   * Native is the fastest (logic)
   * 
   * not just that, it performs way better than pipes
   * which has same performance as data listener (very logic too)
   * 
   * 
   * conclusion:
   * 
   * I believe my own tests which are very simple
   * (just run x amount of time & get the average run time)
   * and give logic results: "a language's native method of doing X, must be the best"
   * 
   * is benchmark js total bs? can't really judge
   * 
   */

  console.log('\nMy benchmark results:');
  await runBenchmarksMine(filePath);
}
