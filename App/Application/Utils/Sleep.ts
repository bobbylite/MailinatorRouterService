export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const sleepSync = (ms: number) => {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}