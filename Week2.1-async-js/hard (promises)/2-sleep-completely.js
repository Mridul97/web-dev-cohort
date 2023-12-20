/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

// Promisified setTimeout
function sleep(milliseconds) {
  let p = new Promise(function (resolve) {
    console.log(2);
    setTimeout(resolve, milliseconds);
    console.log(3);
  });
  return p;
}

async function main() {
  console.log(1);
  await sleep(5000);
  console.log(4);
}

main();

module.exports = sleep;
