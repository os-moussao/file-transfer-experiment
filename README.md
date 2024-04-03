## run
*npm i*

*npm start*

(the script will download a 10mb file to test with)

(make changes to index.js if you want to test with other files)

## experiment
felt lazy to write a proper readme about this small experiment.
here are insights I was writing in my comments: 

```ts
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
   */

```