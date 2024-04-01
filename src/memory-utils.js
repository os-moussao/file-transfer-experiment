export function memFormat(bytes, kbOrMb = 'MB') {
  let div = 1024;
  if (kbOrMb == 'MB') div *= 1024;
  return `${(bytes / div).toFixed(2)} ${kbOrMb}`;
}

export function memMonitor() {
  let { rss: _rss, arrayBuffers: _buffers } = process.memoryUsage();

  const logMemDiff = (kbOrMb = 'MB') => {
    const { rss, arrayBuffers: buffers } = process.memoryUsage();

    console.log(
      'total process memory:',
      memFormat(rss),
      `(+${memFormat(rss - _rss, kbOrMb)})`
    );

    console.log(
      'buffers memory:      ',
      memFormat(buffers),
      `(+${memFormat(buffers - _buffers, kbOrMb)})`
    );

    console.log('            -----');

    (_rss = rss), (_buffers = buffers);
  };

  return logMemDiff;
}

// https://stackoverflow.com/a/64550489
export function logMemory() {
  const memoryData = process.memoryUsage();

  const memoryUsage = {
    rss: `${memFormat(
      memoryData.rss
    )} -> total memory allocated for the process execution`,
    external: `${memFormat(memoryData.external)} -> V8 external memory`,
    arrayBuffers: `${memFormat(
      memoryData.arrayBuffers
    )} -> memory allocated for Buffer's`,
  };

  console.log(memoryUsage);
}
