import benchmark from 'benchmark';
import {
  copyNative,
  copyUsingBuffers,
  copyUsingDataListener,
  copyUsingPipe,
} from './functions.js';

export function runBenchmarks(file) {
  return new Promise((resolve) => {
    const suite = makeBenchmarkTests(file);
    suite.on('complete', () => {
      resolve();
    });
    suite.run();
  });
}

function makeBenchmarkTests(file) {
  const suite = new benchmark.Suite();

  suite.add('Native', {
    defer: true,
    fn: async (deferred) => {
      await copyNative(file);
      deferred.resolve();
    },
  });

  suite.add('Using stream pipes', {
    defer: true,
    fn: async (deferred) => {
      await copyUsingPipe(file);
      deferred.resolve();
    },
  });

  suite.add('Using stream data listeners', {
    defer: true,
    fn: async (deferred) => {
      await copyUsingDataListener(file);
      deferred.resolve();
    },
  });

  suite.add('Using buffers', {
    defer: true,
    fn: async (deferred) => {
      await copyUsingBuffers(file);
      deferred.resolve();
    },
  });

  suite.on('cycle', (event) => console.log(String(event.target)));

  suite.on('complete', function () {
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

    console.log(`\nFastest is: ${this.filter('fastest').map('name')}`);
  });

  return suite;
}
