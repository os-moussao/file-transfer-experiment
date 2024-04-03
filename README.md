## run
*npm i*

*npm start*

(the script will download a 10mb file to test with)

(make changes to index.js if you want to test with other files)

## experiment
felt lazy to write a proper readme about this small experiment.
there is the result:

Benchmark js results:
```
Native x 225 ops/sec ±1.05% (88 runs sampled)
Using stream pipes x 138 ops/sec ±3.34% (67 runs sampled)
Using stream data listeners x 192 ops/sec ±2.52% (74 runs sampled)
Using buffers x 222 ops/sec ±3.52% (81 runs sampled)

Native Avg: 4.44665 Ms
Pipe Avg: 7.24626 Ms
Listener Avg: 5.20765 Ms
Buffer Avg: 4.49680 Ms

Fastest is: Native
```

My benchmark results (avg of running 100 times):
```
copyNative Avg: 115.86247 Ms
copyUsingPipe Avg: 862.75730 Ms
copyUsingDataListener Avg: 861.98733 Ms
copyUsingBuffers Avg: 575.43894 Ms

Fastest is: copyNative
```