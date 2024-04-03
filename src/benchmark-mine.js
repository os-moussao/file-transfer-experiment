import {
  copyNative,
  copyUsingBuffers,
  copyUsingDataListener,
  copyUsingPipe,
} from './functions.js';

export async function runBenchmarksMine(file) {
  const count = 100;
  const functions = [
    copyNative,
    copyUsingPipe,
    copyUsingDataListener,
    copyUsingBuffers,
  ];

  const avgPromises = functions.map((fn) => avgRunTime(count, fn, file));
  const averages = await Promise.all(avgPromises);

  let fastestIdx = 0;
  averages.forEach((avg, idx) => {
    const fn = functions[idx].name;
    console.log(`${fn} Avg: ${avg.toFixed(5)} Ms`);

    if (avg < averages[fastestIdx]) fastestIdx = idx;
  });

  const fastest = functions[fastestIdx].name;
  console.log(`\nFastest is: ${fastest}`);
}

async function avgRunTime(count, fn, ...args) {
  const timesPromises = [];

  for (let i = 0; i < count; i++) {
    timesPromises.push(run(fn, ...args));
  }

  const times = await Promise.all(timesPromises);

  // console.log(fn.name, times);
  const avg = times.reduce((sum, val) => sum + val) / count;

  return avg;
}

async function run(fn, ...args) {
  const s = performance.now();
  await fn(...args);
  return performance.now() - s;
}
